import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../shared/services/client.service';
import { TreeNode } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  files: TreeNode[];
  cols: any[];
  data =  [];
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.GetClients().pipe(
        map((value: any) => {
            value = value.clientes;
            let data = [];
            value.forEach(element => {
                let aux = element.data;
                aux.data['_id'] = element._id;
                data.push(element.data);
            });
            return data;
        })
    ).subscribe((result: any) => {
      this.files = result;
    });

    this.cols = [
      {field: '_id', header: 'ID'},
      { field: 'nombre', header: 'nombre' },
      { field: 'apellidoP', header: 'Apellido Paterno' },
      { field: 'apellidoM', header: 'Apellido Materno' }
  ];
   
  }


}
