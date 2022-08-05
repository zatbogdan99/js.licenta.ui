import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {ToastModule} from "primeng/toast";
import {SplitterModule} from "primeng/splitter";
import {CommonModule} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {SliderModule} from "primeng/slider";
import { DetailedViewComponent } from './detailed-view/detailed-view.component';
import {AccordionModule} from "primeng/accordion";
import {ChipModule} from "primeng/chip";
import {GalleriaModule} from "primeng/galleria";
import { UpdateStockComponent } from './update-stock/update-stock.component';
import {TableModule} from "primeng/table";
import { ConfiguratorComponent } from './configurator/configurator.component';
import { SelectComponent } from './select/select.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { RemoveProductsPageComponent } from './remove-products-page/remove-products-page.component';
import { CartProductsComponent } from './cart-products/cart-products.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'PC workshop',
        clientId: 'licenta-app'
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25
      },
      loadUserProfileAtStartUp: true
    });
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddProductsPageComponent,
    DetailedViewComponent,
    UpdateStockComponent,
    ConfiguratorComponent,
    SelectComponent,
    RemoveProductsPageComponent,
    CartProductsComponent
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
        ImageModule,
        ToastModule,
        SplitterModule,
        CommonModule,
        CheckboxModule,
        RadioButtonModule,
        SliderModule,
        AccordionModule,
        ChipModule,
        GalleriaModule,
        TableModule,
        KeycloakAngularModule
    ],
  providers: [
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
