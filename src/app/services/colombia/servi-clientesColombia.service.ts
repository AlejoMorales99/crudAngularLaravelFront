import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { colombia } from 'src/app/models/colombia/municipios.model';
import { catchError, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiClientesService {

  //esta url es el api donde consumo los departamentos
  urlDepartamentos: String = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json";

  //esta url es la api donde consumo los municipios
  urlMunicipios: String = "https://www.datos.gov.co/resource/xdk5-pm3f.json";

  constructor(private http: HttpClient , private rout: Router) { }

  getDepartamentos() {
    return this.http.get<colombia[]>(`${this.urlDepartamentos}`).pipe(
      catchError(e => {
        this.rout.navigate(['/']);
        console.log(e);
        Swal.fire('error al traer los datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getMunicipios(ciudad:String) {
    return this.http.get<colombia[]>(`${this.urlMunicipios}?departamento=${ciudad}`).pipe(
      catchError(e => {
        this.rout.navigate(['/']);
        console.log(e);
        Swal.fire('error al traer los datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
