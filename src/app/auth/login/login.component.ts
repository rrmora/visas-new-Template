import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario/usuario.model';
import { UsuarioService } from '../../shared/services/usuario.service';
type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

declare let gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public recuerdame: boolean = false;
  public email: string;
  public auth2: any;
  public newUser = false;
  public user: null;
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  public errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toster: ToastrService,
    public userService: UsuarioService
    ) {
    this.loginForm = fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      recuerdame: false
    });
  }

  ngOnInit() {
    this.loginGoogle();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // Login With Google
  loginGoogle() {
    // this.authService.GoogleAuth();
    /*   gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '616298798167-grm8dhlh5up9tt6vnhgbiqi9104ndr2r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingIn(document.getElementById('btnGoogle'));
    });   */
  }

  attachSingIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token).subscribe(result => {
        this.router.navigate(['/dashboard']);
      });
    });
  }

  // Login With Twitter
  loginTwitter(): void {
    // this.authService.signInTwitter();
  }

  // Login With Facebook
  loginFacebook() {
    // this.authService.signInFacebok();
  }

  // Simple Login
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    let usuario = new Usuario(
      null, this.loginForm.value['email'], this.loginForm.value['password'],'admin'
    );
    this.userService.login(usuario).subscribe((result) => {
      this.router.navigate(['/dashboard']);

    }) 
  }

}
