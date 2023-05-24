import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
