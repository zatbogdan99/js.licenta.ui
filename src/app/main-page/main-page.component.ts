import {Component, Injectable, OnInit} from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../../dto/product.dto";
import {DataViewModule} from 'primeng/dataview';
import {MenuItem, PrimeNGConfig, SelectItem, SortEvent} from "primeng/api";
import {GMapModule} from 'primeng/gmap';
import {Router} from "@angular/router";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
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
              private primengConfig: PrimeNGConfig, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    console.log('toate produsele: ', this.products);

    this.sortOptions = [
      {label: 'Descrescator dupa pret', value: '!price'},
      {label: 'Crescator dupa pret', value: 'price'}
    ];

    this.items = [
      {label: 'Laptop', icon: 'pi pi-check', command: () => {
          this.addLaptop();
        }},
      {label: 'Placa video', icon: 'pi pi-check', command: () => {
          this.addGraphicsCard();
        }},
      {label: 'Procesor', icon: 'pi pi-check', command: () => {
        this.addProcessor();
        }}
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

  }

  private addLaptop() {
    console.log('intru pe addLaptop');
    // this.router.navigateByUrl('/add-products');
  }

  private addGraphicsCard() {

  }

  private addProcessor() {

  }
}
