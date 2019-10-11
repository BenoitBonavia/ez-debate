import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HomeComponent} from "./home/home.component";
import {DataDetailComponent} from "./data/card-detail/data-detail.component";
import {MatCardModule} from "@angular/material/card";
import {DataListingComponent} from "./data/listing/data-listing.component";
import {CreateDataComponent} from "./data/create/create-data.component";
import {MatStepperModule} from "@angular/material/stepper";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DataService} from "./service/data.service";
import {HttpClientModule} from "@angular/common/http";
import {SearchDataComponent} from "./data/search/search-data.component";
import {CardDataComponent} from "./data/card/card-data.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {NgxMasonryModule} from "ngx-masonry";
import {IconService} from "./service/icon.service";
import {VideoEmbedComponent} from "./common/video-embed/video.embed.component";
import {EmbedVideo} from 'ngx-embed-video';
import {DetailComponent} from "./data/detail/detail.component";
import {HorizontalVideoCarouselComponent} from "./common/horizontal-video-carousel/horizontal-video-carousel.component";
import {SearchService} from "./service/search.service";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {TagService} from "./service/tag.service";
import {TagListComponent} from "./data/tag-list/tag-list.component";
import {EditTitleSubtitleComponent} from "./data/edit/title-subtitle/edit-title-subtitle.component";
import {EditTagsComponent} from "./data/edit/tags/edit-tags.component";
import {EditVideosComponent} from "./data/edit/videos/edit-videos.component";
import {EditSourcesComponent} from "./data/edit/sources/edit-sources.component";
import {EditIconComponent} from "./data/edit/icon/edit-icon.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DataDetailComponent,
    DataListingComponent,
    CreateDataComponent,
    SearchDataComponent,
    CardDataComponent,
    VideoEmbedComponent,
    DetailComponent,
    HorizontalVideoCarouselComponent,
    TagListComponent,
    EditTitleSubtitleComponent,
    EditTagsComponent,
    EditVideosComponent,
    EditSourcesComponent,
    EditIconComponent,
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
    NgxMasonryModule,
    EmbedVideo.forRoot(),
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatChipsModule,

  ],
  providers: [
    DataService,
    IconService,
    SearchService,
    MatSnackBar,
    TagService,
    Overlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
