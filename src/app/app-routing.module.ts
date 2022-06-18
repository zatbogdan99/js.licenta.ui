import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AddProductsPageComponent} from "./add-products-page/add-products-page.component";
import {DetailedViewComponent} from "./detailed-view/detailed-view.component";
import {AuthGuard} from "./app.guard";

const routes: Routes = [
  {path: '', component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {path: 'add-products', component: AddProductsPageComponent},
  {path: 'detailed-view', component: DetailedViewComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
