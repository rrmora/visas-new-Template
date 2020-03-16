import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from '../data/config/config';
import { ToastrService } from 'ngx-toastr';
import { SubirArchivoService } from './subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;
  public token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    private toster: ToastrService,
    private subirArchivoService: SubirArchivoService
    ) { }

    isLogged() {
      return (this.token.length > 5) ? true : false;
     }

   inicializarDeStorage(){
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }

   guardarLocalStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + '/login/google';
    return this.http.post(url, {token} ).pipe(map((result: any) =>{
      this.guardarLocalStorage(result.id, result.token, result.usuario);
      return true;
    })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICES + '/login';
    return this.http.post(url, usuario).pipe(map( (result: any) => {
        this.guardarLocalStorage(result.id, result.token, result.usuario);
        return true;
      })
    );
   }

   logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuarios');
    this.router.navigate(['/login']);
  }

  ///// USUARIOS \\\\\\\
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario';
    return this.http.post(url, usuario).pipe(map((result: Usuario) => {
      this.toster.success('Usuario creado con exito');
      return result;
    })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map((result: any) => {
      if (usuario._id === this.usuario._id) {
        let userdb: Usuario = result.usuario;
        this.guardarLocalStorage(userdb._id, this.token, userdb);
      }
      this.toster.success('Usuario actualizado con exito');
      return true;
    }));
  }

  cambiarImagen(file: File, id: string) {
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then((result: any) => {
        this.usuario.img = result.usuario.img;
        this.toster.success('Usuario actualizado con exito');
        this.guardarLocalStorage(id, this.token, this.usuario);
    })
    .catch(res => {
        console.log(res);
    });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICES + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(search: string) {
    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + search;
    return this.http.get(url)
    .pipe(map( (result: any) => result.usuarios)
    );
  }

  borarUsuario(id: string) {
    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url);
  }

}
