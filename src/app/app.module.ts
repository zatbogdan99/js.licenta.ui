import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from "@angular/material/chips";
import { MainPageComponent } from './main-page/main-page.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {Panel, PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from "@angular/material/slider";
import {StyleClassModule} from "primeng/styleclass";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {GMapModule} from "primeng/gmap";
import {SplitButtonModule} from "primeng/splitbutton";
import { AddProductsPageComponent } from './add-products-page/add-products-page.component';
import {RouterModule} from "@angular/router";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {FileUploadModule} from "primeng/fileupload";
import {MessageService} from "primeng/api";
import {ImageModule} from "primeng/image";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddProductsPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatRadioModule,
        MatChipsModule,
        HttpClientModule,
        DataViewModule,
        ButtonModule,
        PanelModule,
        DropdownModule,
        DialogModule,
        InputTextModule,
        RatingModule,
        RippleModule,
        FormsModule,
        MatSliderModule,
        StyleClassModule,
        MatProgressSpinnerModule,
        GMapModule,
        SplitButtonModule,
        DynamicDialogModule,
        FileUploadModule,
        ImageModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
