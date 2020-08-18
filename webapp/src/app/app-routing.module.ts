import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateDataComponent} from "./data/create/create-data.component";
import {SearchDataComponent} from "./data/search/search-data.component";
import {DataDetailComponent} from "./data/detail/data-detail.component";
import {TagsComponent} from "./data/tags/tags.component";
import {LoginRegisterComponent} from "./auth/login-register/login-register.component";
import {BlockUnauthenticatedUserGuard} from "./auth/block-unauthenticated-user.guard";
import {RedirectAuthenticatedUserGuard} from "./auth/redirect-authenticated-user.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SettingsComponent} from "./settings/settings.component";
import {SignupComponent} from "./auth/signup/signup.component";


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
