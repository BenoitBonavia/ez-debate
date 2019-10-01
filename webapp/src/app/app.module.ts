import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HomeComponent} from "./home/home.component";
import {DataDetailComponent} from "./data/detail/data-detail.component";
import {MatCardModule} from "@angular/material/card";
import {DataListingComponent} from "./data/listing/data-listing.component";
import {CreateDataComponent} from "./create-data/create-data.component";
import {MatStepperModule} from "@angular/material/stepper";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DataDetailComponent,
    DataListingComponent,
    CreateDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
