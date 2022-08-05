import {ChangeDetectorRef, Component, Injectable, OnInit, Optional} from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../../dto/product.dto";
import {DataViewModule} from 'primeng/dataview';
import {MenuItem, MessageService, PrimeNGConfig, SelectItem, SortEvent} from "primeng/api";
import {GMapModule} from 'primeng/gmap';
import {Router, RouterStateSnapshot} from "@angular/router";
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {AddProductsPageComponent} from "../add-products-page/add-products-page.component";
import {DomSanitizer} from "@angular/platform-browser";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FilterDto} from "../../dto/filter.dto";
import {UpdateStockComponent} from "../update-stock/update-stock.component";
import {KeycloakService} from "keycloak-angular";
import {RemoveProductsPageComponent} from "../remove-products-page/remove-products-page.component";
import {CartProductsComponent} from "../cart-products/cart-products.component";
import {CartDto} from "../../dto/cart.dto";
import {UpdateProductDto} from "../../dto/update-product.dto";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [DialogService]
})

export class MainPageComponent implements OnInit {

  products: Array<ProductDto>;
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
  cartProductsNumber = 0;
  cartProducts: Array<CartDto> = [];
  productType: string;
  selectedRAMFrequency: string[];
  selectedRAMCAS: string[];
  selectedRAMCapacity: string[];
  selectedRamCapacityAux: string;
  selectedRAMCASAux: string;
  selectedRAMFrequencyAux: string;
  selectedMemoryCapacityAux: string;
  selectedVRAM: string[];
  selectedVRAMAux: string;
  role: boolean;
  selectedSocket: string[];
  selectedSocketAux: string;
  selectedGraphicalInterface: string[];
  selectedGraphicalInterfaceAux: string;


  constructor(private service: LicentaService, private http: HttpClient,
              private primengConfig: PrimeNGConfig, private router: Router,
              public dialogService: DialogService, private sanitization: DomSanitizer,
              private keycloakService: KeycloakService, private messageService: MessageService) {
    this.getAllProducts();
    // this.ref.detectChanges();
    this.user = this.keycloakService.getUsername();
    this.role = keycloakService.isUserInRole("admin");
    if (this.role) {
      console.log("Este admin");
    } else {
      console.log("Este user");
    }
    console.log('toate produsele: ', this.products);
  }



  ngOnInit(): void {
    // this.sortOptions = [
    //   {label: 'Descrescator dupa pret', value: '!price'},
    //   {label: 'Crescator dupa pret', value: 'price'}
    // ];
  }

  reloadList() {
    this.getAllProducts();
    this.filterDTO = new FilterDto();
    this.productType = "";
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
    this.filterDTO.selectedVRAM = this.selectedVRAM;
    if (this.selectedVRAMAux != null) {
      if (this.filterDTO.selectedVRAM != null) {
        this.filterDTO.selectedVRAM.push(this.selectedVRAMAux);
      } else {
        this.filterDTO.selectedVRAM = [];
        this.filterDTO.selectedVRAM.push(this.selectedVRAMAux);
      }
    }
    this.filterDTO.selectedGraphicalInterface = this.selectedGraphicalInterface;
    if (this.selectedGraphicalInterfaceAux != null) {
      if (this.filterDTO.selectedGraphicalInterface != null) {
        this.filterDTO.selectedGraphicalInterface.push(this.selectedGraphicalInterfaceAux);
      } else {
        this.filterDTO.selectedGraphicalInterface = [];
        this.filterDTO.selectedGraphicalInterface.push(this.selectedGraphicalInterfaceAux);
      }
    }
    this.filterDTO.selectedSocket = this.selectedSocket;
    if (this.selectedSocketAux != null) {
      if (this.filterDTO.selectedSocket != null) {
        this.filterDTO.selectedSocket.push(this.selectedSocketAux);
      } else {
        this.filterDTO.selectedSocket = [];
        this.filterDTO.selectedSocket.push(this.selectedSocketAux);
      }
    }
    if (this.selectedMemoryCapacityAux != null) {
      if (this.filterDTO.memoryCapacity != null) {
        this.filterDTO.memoryCapacity.push(this.selectedMemoryCapacityAux);
      } else {
        this.filterDTO.memoryCapacity = [];
        this.filterDTO.memoryCapacity.push(this.selectedMemoryCapacityAux);
      }
    }
    this.filterDTO.productType = this.productType;
    this.filterDTO.ramCapacity = this.selectedRAMCapacity;
    if (this.selectedRamCapacityAux != null) {
      console.log('Adaug ', this.selectedRamCapacityAux);
      if (this.filterDTO.ramCapacity != null) {
        this.filterDTO.ramCapacity.push(this.selectedRamCapacityAux);
      } else {
        this.filterDTO.ramCapacity = [];
        this.filterDTO.ramCapacity.push(this.selectedRamCapacityAux);
      }
    }
    this.filterDTO.selectedRAMCAS = this.selectedRAMCAS;
    if (this.selectedRAMCASAux != null) {
      if (this.filterDTO.selectedRAMCAS != null) {
        this.filterDTO.selectedRAMCAS.push(this.selectedRAMCASAux);
      } else {
        this.filterDTO.selectedRAMCAS = [];
        this.filterDTO.selectedRAMCAS.push(this.selectedRAMCASAux);
      }
    }
    this.filterDTO.selectedRAMFrequency = this.selectedRAMFrequency;
    if (this.selectedRAMFrequencyAux != null) {
      if (this.filterDTO.selectedRAMFrequency != null) {
        this.filterDTO.selectedRAMFrequency.push(this.selectedRamCapacityAux);
      } else {
        this.filterDTO.selectedRAMFrequency = [];
        this.filterDTO.selectedRAMFrequency.push(this.selectedRAMFrequencyAux);
      }
    }
    console.log(this.selectedMemoryCapacity);
    console.log('Filter DTO: ', this.filterDTO);

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
  }

  removeProduct() {
    const ref = this.dialogService.open(RemoveProductsPageComponent, {
      header: 'Ștergere produs',
      width: '70%'
    });
  }

  goToConfigurator() {
    console.log('Astea sunt produsele cand vreau sa intru in configurator: ', this.cartProducts);
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

  backToList($event: Array<CartDto>) {
    console.log("Event", $event);
    if (event != undefined) {
      this.showDetailsView = false;
      this.showConfigurator = false;
      this.cartProducts = $event;
      console.log('Produsele adaugate in cos in pagina principala cand revin din simulator', this.cartProducts);
      this.cartProductsNumber = this.cartProducts.length;
    }
  }

  backToListFromDetailedView($event: CartDto) {
    let cartDto = new CartDto();
    if (event != undefined) {
      this.showDetailsView = false;
      this.showConfigurator = false;
    }
    if ($event != null) {
      cartDto = $event;
      this.cartProducts.push(cartDto);
      this.cartProductsNumber = this.cartProductsNumber + cartDto.productNumber;
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

  getStockLabel(stock: number) {
    if (stock > 5) {
      return "În stoc";
    } else if (stock > 0 && stock < 5) {
      return "Stoc aproape epuizat";
    }
    return "Stoc epuizat";
  }

  async logout() {
    // this.keycloakService.login();
    // this.keycloakService.clearToken();
    this.keycloakService.logout().then(r => r);
    // this.keycloakService.to
    // this.keycloakService.logout();
    // await this.keycloakService.login({
    //   redirectUri: window.location.origin + this.state.url
    // });
  }

  addToCart(product: any, productType: any, stock: number, productNumber: number) {
    console.log('Asa vine product number: ', productNumber);
    this.cartProductsNumber = this.cartProductsNumber + 1;
    let cartDto = new CartDto();
    cartDto.id = product;
    cartDto.productType = productType;
    cartDto.stock = stock;
    cartDto.productNumber = productNumber;
    this.cartProducts.push(cartDto);

    this.messageService.add({
      severity: 'info',
      summary: 'Produs adăugat cu succes',
      detail: 'Produsul a fost adăugat cu succes în coș, vă mulțumim!'
    });
  }

  openCart() {
    console.log('Deschid dialogul cu astea: ', this.cartProducts);
    const ref = this.dialogService.open(CartProductsComponent, {
      header: 'Coș',
      width: '70%',
      data: {
        cartProducts: this.cartProducts
      }
    });

    ref.onClose.subscribe((products) => {
      console.log(products);
      this.cartProductsNumber = this.cartProducts.length;
      if (products.length > 0) {
        console.log('Produsele dupa on close: ', products);
        let auxProducts: Array<ProductDto>;
        auxProducts = products;
        this.enableLoading();
        auxProducts.forEach(product => {
          let updateProductDto = new UpdateProductDto();
          updateProductDto.selectedProduct = product.id;
          updateProductDto.selectedProductType = product.productType;
          console.log('Stock: ', product.stock);
          console.log('Product number: ', product.productNumber);
          updateProductDto.value = product.stock - product.productNumber;
          this.service.updateProductStock(updateProductDto).subscribe(async () => {
            console.log('updated');
          });

        })
        this.disableLoading();

        this.messageService.add({
          severity: 'info',
          summary: 'Achiziție realizată cu succes',
          detail: 'Produsele au fost achiziționate cu succes, vă mulțumim!'
        });
        this.cartProductsNumber = 0;
        this.cartProducts = [];
      }
    })
  }

  public selectProduct() {

  }
}
