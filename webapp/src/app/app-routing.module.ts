import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateDataComponent} from "./data/create/create-data.component";
import {SearchDataComponent} from "./data/search/search-data.component";
import {DataDetailComponent} from "./data/detail/data-detail.component";
import {RegisterComponent} from "./auth/register/register.component";
import {TagsComponent} from "./data/tags/tags.component";
import {RegistrationConfirmComponent} from "./auth/registration-confirm/registration-confirm.component";
import {LoginComponent} from "./auth/login/login.component";
import {ResendTokenComponent} from "./auth/resend-token/resend-token.component";
import {LoginRegisterComponent} from "./auth/login-register/login-register.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateDataComponent },
  { path: 'research', component: SearchDataComponent },
  { path: 'detail/:id', component: DataDetailComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'register', component: LoginRegisterComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'resend-token/:token', component: ResendTokenComponent },
  { path: 'registrationConfirmation/:token', component: RegistrationConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
