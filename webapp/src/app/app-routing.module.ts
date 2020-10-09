import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./screen/home/home.component";
import {CreateDataComponent} from "./screen/create-data/create-data.component";
import {SearchDataComponent} from "./screen/search/search-data.component";
import {DataDetailComponent} from "./data/detail/data-detail.component";
import {TagsComponent} from "./screen/tags-screen/tags.component";
import {LoginRegisterComponent} from "./security/login-register/login-register.component";
import {BlockUnauthenticatedUserGuard} from "./security/block-unauthenticated-user.guard";
import {RedirectAuthenticatedUserGuard} from "./security/redirect-authenticated-user.guard";
import {PageNotFoundComponent} from "./screen/page-not-found/page-not-found.component";
import {SettingsComponent} from "./screen/settings-screen/settings.component";
import {SignupComponent} from "./security/signup/signup.component";
import {UsersAdministrationComponent} from "./screen/users-administration/users-administration.component";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    canActivateChild: [BlockUnauthenticatedUserGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'create', component: CreateDataComponent},
      {path: 'research', component: SearchDataComponent},
      {path: 'detail/:id', component: DataDetailComponent},
      {path: 'tags', component: TagsComponent},
      {path: 'register', component: LoginRegisterComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'users', component: UsersAdministrationComponent}
    ]
  },
  {path: 'login', component: LoginRegisterComponent, canActivateChild: [RedirectAuthenticatedUserGuard]},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
