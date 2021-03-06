import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./common/header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HomeComponent} from "./screen/home/home.component";
import {MatCardModule} from "@angular/material/card";
import {DataListingComponent} from "./data/data-listing/data-listing.component";
import {CreateDataComponent} from "./screen/create-data/create-data.component";
import {MatStepperModule} from "@angular/material/stepper";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DataService} from "./service/data.service";
import {HttpClientModule} from "@angular/common/http";
import {SearchDataComponent} from "./screen/search/search-data.component";
import {CardDataComponent} from "./data/card/card-data.component";
import {MatSnackBar, MatSnackBarContainer} from "@angular/material/snack-bar";
import {Overlay, OverlayContainer} from "@angular/cdk/overlay";
import {IconService} from "./service/icon.service";
import {EmbedVideo} from 'ngx-embed-video';
import {DataDetailComponent} from "./data/detail/data-detail.component";
import {SearchService} from "./service/search.service";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {TagService} from "./service/tag.service";
import {TagListComponent} from "./data/tag-list/tag-list.component";
import {EditTitleSubtitleComponent} from "./data/edit/title-subtitle/edit-title-subtitle.component";
import {EditTagsComponent} from "./data/edit/edit-tags/edit-tags.component";
import {EditMediasComponent} from "./data/edit/edit-medias/edit-medias.component";
import {EditSourcesComponent} from "./data/edit/edit-sources/edit-sources.component";
import {EditIconComponent} from "./data/edit/edit-icon/edit-icon.component";
import {CardSourceComponent} from "./data/source-card/card-source.component";
import {MatBadgeModule} from "@angular/material/badge";
import {BadgeButtonComponent} from "./common/badge-button/badge-button.component";
import {HoldableDirective} from './holdable.directive';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HorizontalCardCarouselComponent} from "./common/horizontal-card-carousel/horizontal-card-carousel.component";
import {FullScreenVideoComponent} from "./common/full-screen-video/full-screen-video.component";
import {VideoEmbederComponent} from "./common/video-embeder/video.embeder.component";
import {TagsComponent} from "./screen/tags-screen/tags.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoginRegisterComponent} from "./security/login-register/login-register.component";
import {HorizontalCardDataComponent} from "./data/horizontal-card/horizontal-card-data.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AuthenticationService} from "./service/authentication.service";
import {AuthenticatedUserService} from "./service/authenticated-user.service";
import {BlockUnauthenticatedUserGuard} from "./security/block-unauthenticated-user.guard";
import {LoginFormComponent} from "./security/login-form/login-form.component";
import {FloatingButtonsComponent} from "./common/floating-buttons/floating-buttons.component";
import {AuthenticationNavigationService} from "./service/authentication-navigation.service";
import {PageNotFoundComponent} from "./screen/page-not-found/page-not-found.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MobileMenuLinksComponent} from "./common/header/mobile-menu-links/mobile-menu-links.component";
import {FloatingButtonsService} from "./service/floating-buttons.service";
import {DesktopMenuLinksComponent} from "./common/header/desktop-menu-links/desktop-menu-links.component";
import {SettingsComponent} from "./screen/settings-screen/settings.component";
import {ThemeService} from "./theme.service";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SignupComponent} from "./security/signup/signup.component";
import {SignupFormComponent} from "./security/signup-form/signup-form.component";
import {UsersAdministrationComponent} from "./screen/users-administration/users-administration.component";
import {UserService} from "./service/user.service";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {LoadMoreButtonComponent} from "./common/load-more-button/load-more-button.component";
import {PaginationService} from "./service/pagination.service";
import {WaybackMachineService} from "./service/wayback-machine.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {EditTextComponent} from "./data/edit/edit-text/edit-text.component";
import {UploadMediaAreaComponent} from "./common/upload-media-area/upload-media-area.component";
import {DropZoneDirective} from "./directives/drop-zone.directive";
import {AwsS3Service} from "./service/aws-s3.service";
import {SourceMasonryListingComponent} from "./data/source-grid/source-masonry.listing.component";
import {NgxMasonryModule} from 'ngx-masonry';
import {YoutubeEmbederComponent} from "./common/youtube-embeder/youtube-embeder.component";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {MediaCarouselComponent} from "./common/media-carousel/media-carousel.component";
import {RutubeService} from "./service/rutube.service";
import {RutubeEmbederComponent} from "./common/rutube-embeder/rutube-embeder.component";
import {UrlSanitizePipe} from "./common/url-sanitize.pipe";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogContentComponent
} from "./common/confirmation-dialog/confirmation-dialog.component";
import {MatDialogModule,} from "@angular/material/dialog";
import { EditTypeComponent } from './screen/tags-screen/edit-type/edit-type.component';
import { EditTagComponent } from './screen/tags-screen/edit-tag/edit-tag.component';
import { TagsV2Component } from './data/edit/tags-v2/tags-v2.component';
import { ArchiveVideoEmbederComponent } from './common/archive-video-embeder/archive-video-embeder.component';

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
    TagListComponent,
    EditTitleSubtitleComponent,
    EditTagsComponent,
    EditMediasComponent,
    EditSourcesComponent,
    EditIconComponent,
    EditTextComponent,
    CardSourceComponent,
    BadgeButtonComponent,
    HoldableDirective,
    HorizontalCardCarouselComponent,
    FullScreenVideoComponent,
    VideoEmbederComponent,
    TagsComponent,
    LoginFormComponent,
    LoginRegisterComponent,
    AppComponent,
    HorizontalCardDataComponent,
    FloatingButtonsComponent,
    PageNotFoundComponent,
    MobileMenuLinksComponent,
    DesktopMenuLinksComponent,
    SettingsComponent,
    SignupComponent,
    SignupFormComponent,
    UsersAdministrationComponent,
    LoadMoreButtonComponent,
    UploadMediaAreaComponent,
    SourceMasonryListingComponent,
    YoutubeEmbederComponent,
    MediaCarouselComponent,
    RutubeEmbederComponent,
    ConfirmationDialogContentComponent,
    DropZoneDirective,
    UrlSanitizePipe,
    EditTypeComponent,
    EditTagComponent,
    TagsV2Component,
    ArchiveVideoEmbederComponent
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
    EmbedVideo.forRoot(),
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    HammerModule,
    MatTableModule,
    MatExpansionModule,
    MatTooltipModule,
    CKEditorModule,
    NgxMasonryModule,
    YouTubePlayerModule,
    MatDialogModule,
  ],
  providers: [
    DataService,
    IconService,
    SearchService,
    MatSnackBar,
    TagService,
    UserService,
    RutubeService,
    FloatingButtonsService,
    AuthenticationService,
    AuthenticationNavigationService,
    AuthenticatedUserService,
    BlockUnauthenticatedUserGuard,
    ThemeService,
    PaginationService,
    WaybackMachineService,
    AwsS3Service,
    Overlay,
    ConfirmationDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
