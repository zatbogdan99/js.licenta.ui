import {Component, Injectable, OnInit} from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../../dto/product.dto";
import {DataViewModule} from 'primeng/dataview';
import {MenuItem, PrimeNGConfig, SelectItem, SortEvent} from "primeng/api";
import {GMapModule} from 'primeng/gmap';
import {Router} from "@angular/router";
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {AddProductsPageComponent} from "../add-products-page/add-products-page.component";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [DialogService]
})

export class MainPageComponent implements OnInit {

  products: any;
  loading: boolean = false;
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  items: MenuItem[];
  options: any;

  constructor(private service: LicentaService, private http: HttpClient,
              private primengConfig: PrimeNGConfig, private router: Router,
              public dialogService: DialogService, private sanitization: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    console.log('toate produsele: ', this.products);

    this.sortOptions = [
      {label: 'Descrescator dupa pret', value: '!price'},
      {label: 'Crescator dupa pret', value: 'price'}
    ];
  }

  getAllProducts() {
    this.products = [];
    this.service.getAllProducts().subscribe(data => {
      this.enableLoading();
      data.forEach(data => {
        this.products?.push(data);
      })
      console.log(this.products);
      this.disableLoading();
    }, error => {
      console.error('EROARE la aducerea tuturor produselor');
    })

    this.primengConfig.ripple = true;
  }

  onSortChange(event :SortEvent) {
    console.log('SortEvent: ', event);
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }

  addProduct() {
    const ref = this.dialogService.open(AddProductsPageComponent, {
      header: 'Adăugare produs',
      width: '70%'
    });
    // this.router.navigateByUrl('/add-products');
  }
}
