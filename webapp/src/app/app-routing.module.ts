import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateDataComponent} from "./data/create/create-data.component";
import {SearchDataComponent} from "./data/search/search-data.component";
import {DetailComponent} from "./data/detail/detail.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateDataComponent },
  { path: 'research', component: SearchDataComponent},
  { path: 'detail/:id', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
