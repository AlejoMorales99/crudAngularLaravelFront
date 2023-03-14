import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { clientes } from 'src/app/models/clientes/clientes.models';
import { colombia } from 'src/app/models/colombia/municipios.model';
import { ServiCrudClientesService } from 'src/app/services/clientes/servi-crud-clientes.service';
import { ServiClientesService } from 'src/app/services/colombia/servi-clientesColombia.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.css']
})
export class MostrarClientesComponent implements OnInit {

  _token: any = "";
  p: any = "_token";

  clientes: clientes[] = [];
  departamentos: colombia [] = [];
  municipios: colombia [] = [];

  errorBorderInputs: boolean = false;

  constructor(private serviClientes: ServiClientesService, private serviCrudClientes: ServiCrudClientesService,) {}

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



    //llamo al servicio y obtengo todos los clientes :)
    this.serviCrudClientes.getClientesAll().subscribe(clientesAll => {
      this.clientes = clientesAll;

      console.log(this.clientes);
    });

    //llamo al servicio de los departamentos y municipios
    this.serviClientes.getDepartamentos().subscribe(colombia => {

      this.departamentos = colombia;

    });
  }

  ciudadesMunicipio(ciudad:any) {

    this.serviClientes.getMunicipios(ciudad.value).subscribe(data => {

      this.municipios = data;

      console.log(this.municipios);

    });


  }

  submit() {

    if (this.frmClientes.valid) {

      /* this.frmClientes.addControl(this.p, new FormControl(this._token));

      console.log(this.frmClientes.value); */

      this.serviCrudClientes.postCrearCliente(this.frmClientes.value).subscribe(data => {

        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Registro insertado con exito',
        })

        this.ngOnInit();

      });


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'por favor llena los campos requeridos',
      })
    }



  }

  deleteCliente(cliente:number, nombre:String, apellido:String) {
    Swal.fire({
      title: `Esta seguro de eliminar al cliente ${nombre}-${apellido} ?`,
      text: "Esta operacion no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.serviCrudClientes.deleteCliente(cliente).subscribe(res => {

          Swal.fire(
            'Eliminado!',
            'Cliente eliminado con exito.',
            'success'
          )

          this.ngOnInit();

        });



      }
    })
  }

}
