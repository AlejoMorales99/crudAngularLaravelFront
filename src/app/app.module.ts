import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MostrarClientesComponent } from './clientes/mostrarClientes/mostrar-clientes/mostrar-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarClientesComponent } from './clientes/actualizarClintes/actualizar-clientes/actualizar-clientes.component';


const appRoutes: Routes = [
  { path: '', component: MostrarClientesComponent },
  { path: 'actualizarCliente/:id', component: ActualizarClientesComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    MostrarClientesComponent,
    ActualizarClientesComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
