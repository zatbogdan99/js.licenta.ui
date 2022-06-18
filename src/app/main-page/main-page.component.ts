import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
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
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FilterDto} from "../../dto/filter.dto";
import {UpdateStockComponent} from "../update-stock/update-stock.component";
import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [DialogService]
})

export class MainPageComponent implements OnInit {

  products: any;
  loading: boolean = false;
  // sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  items: MenuItem[];
  options: any;
  // filter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // filterObs: Observable<boolean> = this.filter.asObservable();
  sortOption: string;
  rangeValues: number[] = [0, 5000];
  selectedProcessors: string[] = [];
  selectedMemory: string[] = [];
  selectedMemoryCapacity: string[] = [];
  selectedRAM: string[] = [];
  showDetailsView: boolean = false;
  showConfigurator: boolean = false;
  selectedProduct: ProductDto;
  filterDTO: FilterDto;
  user = '';

  constructor(private service: LicentaService, private http: HttpClient,
              private primengConfig: PrimeNGConfig, private router: Router,
              public dialogService: DialogService, private sanitization: DomSanitizer,
              private keycloakService: KeycloakService) {
    this.getAllProducts();
    // this.ref.detectChanges();
    this.user = this.keycloakService.getUsername();
    console.log('toate produsele: ', this.products);
  }



  ngOnInit(): void {
    // this.sortOptions = [
    //   {label: 'Descrescator dupa pret', value: '!price'},
    //   {label: 'Crescator dupa pret', value: 'price'}
    // ];
  }

  getAllProducts() {
    this.products = [];
    this.enableLoading();
    this.service.getAllProducts().subscribe(data => {
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

  updateProducts() {
    this.products = [];
    this.filterDTO = new FilterDto();
    this.filterDTO.minRange = this.rangeValues[0];
    this.filterDTO.maxRange = this.rangeValues[1];
    this.filterDTO.processor = this.selectedProcessors;
    this.filterDTO.ram = this.selectedRAM;
    this.filterDTO.memory = this.selectedMemory;
    this.filterDTO.memoryCapacity = this.selectedMemoryCapacity;
    console.log(this.selectedMemoryCapacity);

    this.enableLoading();
    this.service.updateProducts(this.filterDTO).subscribe(data => {
      console.log("Datele updated: ", data);
      data.forEach(data => {
        this.products?.push(data);
      })
      console.log(this.products);
      this.disableLoading();
    }, error => {
      console.log('Eroare la actualizarea produselor');
    })

    // this.service.refreshPage();
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

  goToConfigurator() {
    this.showConfigurator = true;
    // console.log(this.filter);
    // this.filter.next(false);
    // this.filterObs.subscribe();
  }

  moveToDetailedView(product: ProductDto) {
    this.selectedProduct = product;
    this.showDetailsView = true;
    console.log('Ii dau product = ', this.selectedProduct);
    // this.router.navigateByUrl('/detailed-view');
  }

  backToList($event: boolean) {
    console.log("Event", event);
    if (event != undefined) {
      this.showDetailsView = false;
      this.showConfigurator = false;
    }
  }

  filterByName($event: Event) {
    return ($event.target as HTMLInputElement).value;
  }

  sortByPrice(product1: ProductDto, product2: ProductDto) {
    if (product1.price < product2.price) {
      return -1;
    } else if (product1.price > product2.price) {
      return 1;
    }
    return 0;
  }

  sortByValue() {
  if (this.sortOption === "Crescator") {
    this.sortOrder = 1;
    this.sortField = "price";
  } else if (this.sortOption === "Descrescator") {
    this.sortOrder = -1;
    this.sortField = "price";
  }
  }

  updateStock() {
    const ref = this.dialogService.open(UpdateStockComponent, {
      header: 'Actualizare stoc',
      width: '70%'
    });
  }

  logout() {
    this.keycloakService.logout();
  }
}
