import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AddProductsPageComponent} from "./add-products-page/add-products-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'add-products', component: AddProductsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
