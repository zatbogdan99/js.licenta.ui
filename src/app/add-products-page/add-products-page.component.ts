import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-products-page',
  templateUrl: './add-products-page.component.html',
  styleUrls: ['./add-products-page.component.css']
})
export class AddProductsPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('intram in onInit');
  }

}
