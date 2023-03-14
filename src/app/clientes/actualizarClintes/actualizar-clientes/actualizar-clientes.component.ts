import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { clientes } from 'src/app/models/clientes/clientes.models';
import { colombia } from 'src/app/models/colombia/municipios.model';
import { ServiCrudClientesService } from 'src/app/services/clientes/servi-crud-clientes.service';
import { ServiClientesService } from 'src/app/services/colombia/servi-clientesColombia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-clientes',
  templateUrl: './actualizar-clientes.component.html',
  styleUrls: ['./actualizar-clientes.component.css']
})
export class ActualizarClientesComponent implements OnInit {

  departamentos: colombia [] = [];
  municipios: colombia[] = [];
  cliente!: clientes;
  myControl: any;

  errorBorderInputs: boolean = false;

  constructor(private rutaActiva: ActivatedRoute, private serviClientes: ServiClientesService, private serviCrudClientes: ServiCrudClientesService, private rout: Router) { }

  frmClientes = new FormGroup({

    cedula: new FormControl('', [Validators.required, Validators.maxLength(10) , Validators.minLength(3) , Validators.pattern(/^([0-9])*$/) ]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required , Validators.minLength(10) , Validators.maxLength(10) , Validators.pattern(/^([0-9])*$/) ]),
    correo: new FormControl('', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]),
    departamento: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
  });

  ngOnInit() {

    this.serviCrudClientes.buscarCliente(this.rutaActiva.snapshot.paramMap.get('id')!).subscribe((cliente) => {

      this.cliente = cliente;

      // this.myControl = new FormControl('valorInicial');

      this.frmClientes.setValue({
        cedula: `${this.cliente.cedula}`,
        nombre: `${this.cliente.nombre}`,
        apellido: `${this.cliente.apellido}`,
        celular: `${this.cliente.celular}`,
        correo: `${this.cliente.correo}`,
        departamento: `${this.cliente.departamento}`,
        password: `${this.cliente.password}`,
        municipio: `${this.cliente.municipio}`
      });

    });


    //llamo al servicio de los departamentos y municipios
    this.serviClientes.getDepartamentos().subscribe(colombia => {

      this.departamentos = colombia;

    });

  }


  submit() {

    if (this.frmClientes.valid) {
       this.serviCrudClientes.actualizarCliente(this.rutaActiva.snapshot.paramMap.get('id')!, this.frmClientes.value).subscribe(res => {


         Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: 'CLIENTE ACTUALIZADO CON EXITO',
        })


        this.rout.navigate(['/']);

      });


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'por favor llena los campos requeridos',
      })
    }

  }

  ciudadesMunicipio(ciudad:any) {

    this.serviClientes.getMunicipios(ciudad.value).subscribe(data => {

      this.municipios = data;

      console.log(this.municipios);

    });


  }




}
