import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { clientes } from 'src/app/models/clientes/clientes.models';

@Injectable({
  providedIn: 'root'
})
export class ServiCrudClientesService {


  urlApiCrudLaravel: String = "http://127.0.0.1:8000/clientes/";


  constructor(private http: HttpClient, private rout: Router) {}

  /* getToken() {
    return this.http.get("http://127.0.0.1:8000/token");
  } */

  getClientesAll() {
    return this.http.get<clientes[]>(`${this.urlApiCrudLaravel}`).pipe(
      catchError(e => {
        this.rout.navigate(['/']);
        console.log(e);
        Swal.fire('error al traer los datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  postCrearCliente(cliente: any) {
    return this.http.post(`${this.urlApiCrudLaravel}`, cliente ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }

        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }


  deleteCliente(cliente: number) {
    return this.http.delete(`${this.urlApiCrudLaravel}delete/${cliente}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }

        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }

  buscarCliente(cliente: string) {
    return this.http.get<clientes>(`${this.urlApiCrudLaravel}${cliente}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }

        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }


  actualizarCliente(id:String, cliente: unknown) {
    return this.http.put(`${this.urlApiCrudLaravel}${id}`, cliente ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }

        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }


}
