import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './../../app-material.module';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
  ]
}];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
