import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HomeComponent} from "./home/home.component";
import {DataDetailComponent} from "./data/detail/data-detail.component";
import {MatCardModule} from "@angular/material/card";
import {DataListingComponent} from "./data/listing/data-listing.component";
import {CreateDataComponent} from "./data/create/create-data.component";
import {MatStepperModule} from "@angular/material/stepper";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DataService} from "./data.service";
import {HttpClientModule} from "@angular/common/http";
import {SearchDataComponent} from "./data/search/search-data.component";
import {CardDataComponent} from "./data/card/card-data.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {NgxMasonryModule} from "ngx-masonry";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DataDetailComponent,
    DataListingComponent,
    CreateDataComponent,
    SearchDataComponent,
    CardDataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    FlexLayoutModule,
    FormsModule,
    NgxMasonryModule
  ],
  providers: [
    DataService,
    MatSnackBar,
    Overlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
