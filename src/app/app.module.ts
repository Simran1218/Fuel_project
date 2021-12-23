import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewStationComponent } from './view-station/view-station.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStationComponent } from './add-station/add-station.component';
import { ListStationComponent } from './view-station/remove-station/list-station.component';
import { EditStationComponent } from './view-station/edit-station/edit-station.component';
import { Places } from './Places';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewStationComponent,
    ListStationComponent,
    AddStationComponent,
    EditStationComponent,
    SearchComponent,
    FooterComponent,
    HeaderComponent,
    FieldErrorDisplayComponent,
    
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
