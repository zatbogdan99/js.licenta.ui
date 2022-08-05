import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {MessageService} from "primeng/api";
import {ProductDto} from "../../dto/product.dto";
import {AddProductsPageComponent} from "../add-products-page/add-products-page.component";
import {DialogService} from "primeng/dynamicdialog";
import {SelectComponent} from "../select/select.component";
import {ProcessorDto} from "../../dto/processor.dto";
import {GraphicsCardDto} from "../../dto/graphics-card.dto";
import {StorageDto} from "../../dto/storage.dto";
import {RamDto} from "../../dto/ram.dto";
import {MotherboardDto} from "../../dto/motherboard.dto";
import {DomSanitizer} from "@angular/platform-browser";
import {PhotosModelDto} from "../../dto/photos.model.dto";
import {LaptopDto} from "../../dto/laptop.dto";
import {ConfiguratorDto} from "../../dto/configurator.dto";
import {CartDto} from "../../dto/cart.dto";

class Product {
  product: string;
  value: number;
  productId: number;

  constructor(product: string, value: number, productId: number) {
    this.product = product;
    this.value = value;
    this.productId = productId;
  }
}

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})

export class ConfiguratorComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter<Array<CartDto>>();

  @Input() initialCartProducts: Array<CartDto>;

  processors: Product[] = [];

  products: ProductDto[] = [];

  laptopProducts: ProductDto[] = [];

  rams: Product[] = [];

  motherboards: Product[] = [];

  laptops: Product[] = [];

  storages: Product[] = [];

  graphicsCards: Product[] = [];

  loading: boolean = false;

  cartProducts: Array<CartDto> = [];

  selectedProcessor: ProcessorDto;
  selectedRam: RamDto;
  selectedStorage: StorageDto;
  selectedGraphicsCard: GraphicsCardDto;
  selectedMotherboard: MotherboardDto;
  selectedLaptop: LaptopDto;
  firstStep: boolean = true;
  secondStep: boolean = true;
  empty: string = "-";
  total = 0;
  configuratorDto: ConfiguratorDto = new ConfiguratorDto();
  laptopTotal: number = 0;

  constructor(private service: LicentaService, private messageService: MessageService,
              public dialogService: DialogService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.loadProducts();

    let product = new ProductDto();
    product.name = "Laptop";
    product.productType = "Laptop";
    this.laptopProducts.push(product);

    product = new ProductDto();
    product.name = "Memorie RAM";
    product.productType = "Memorie RAM";
    this.laptopProducts.push(product);

    product = new ProductDto();
    product.name = "Stocare";
    product.productType = "Stocare";
    this.laptopProducts.push(product);

    product = new ProductDto();
    product.name = "Procesor";
    product.productType = "Procesor";
    this.products.push(product);

    product = new ProductDto();
    product.name = "Placă video";
    product.productType = "Placă video";
    this.products.push(product);

    product = new ProductDto();
    product.name = "Memorie RAM";
    product.productType = "Memorie RAM";
    this.products.push(product);

    product = new ProductDto();
    product.name = "Stocare";
    product.productType = "Stocare";
    this.products.push(product);

    product = new ProductDto();
    product.name = "Placă de bază";
    product.productType = "Placă de bază";
    this.products.push(product);

    if (this.initialCartProducts != null && this.initialCartProducts.length > 0) {
      if (this.cartProducts.length > 0) {
        this.initialCartProducts.forEach(cartProduct => {
          this.cartProducts.push(cartProduct);
        })
      } else {
        this.cartProducts = this.initialCartProducts;
      }
    }
    console.log('Initial cart products: ', this.initialCartProducts);
    console.log('Produsele in cos la intrarea in configurator', this.cartProducts);
  }

  private loadProducts() {
    this.enableLoading();
    this.service.getProcessors().subscribe(data => {
      let i = 1;
      data.forEach(p => {
        this.processors.push(new Product(p.description, i++, p.id));
      })
      this.disableLoading();
    });

    this.enableLoading();
    this.service.getGraphicCards().subscribe(data => {
      console.log('Placile video: ', data);
      let i = 1;
      data.forEach(p => {
        if (p.forLaptop != null) {
          this.graphicsCards.push(new Product(p.description, i++, p.id));
        }
      })
      this.disableLoading();
    });

    this.enableLoading();
    this.service.getStorage().subscribe(data => {
      let i = 1;
      data.forEach(p => {
        this.storages.push(new Product(p.description, i++, p.id));
      })
      this.disableLoading();
    });

    this.enableLoading();
    this.service.getRam().subscribe(data => {
      let i = 1;
      data.forEach(p => {
        this.rams.push(new Product(p.description, i++, p.id));
      })
      this.disableLoading();
    });

    this.enableLoading();
    this.service.getMotherboard().subscribe(data => {
      let i = 1;
      data.forEach(p => {
        this.motherboards.push(new Product(p.description, i++, p.id));
      })
      this.disableLoading();
    });
  }

  public gotoSelectComponent(product: ProductDto) {
    console.log('Deschid din nou componenta de select cu asta: ', this.configuratorDto);
    const ref = this.dialogService.open(SelectComponent, {
      header: 'Selectați componenta de tip ' + product.productType + ' dorită: ',
      width: '70%',
      data: {
        product: product,
        configuratorDto: this.configuratorDto
      }
    });

    ref.onClose.subscribe((data) => {
      console.log("Se apeleaza on close");
      // this.configuratorDto = data.configuratorDto;
      switch (data.productType) {
        case "GraphicsCard": {
          this.selectedGraphicsCard = data.data;
          // this.configuratorDto.graphicsCard = data.data;
          this.products[1].id = this.selectedGraphicsCard.id;
          this.products[1].name = this.selectedGraphicsCard.model;
          let photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedGraphicsCard.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.products[1].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.products[1].price = this.selectedGraphicsCard.price;
          this.products[1].description = this.selectedGraphicsCard.chipset + " " + this.selectedGraphicsCard.model + " "
            this.selectedGraphicsCard.capacity;
          this.total += this.selectedGraphicsCard.price;
          this.configuratorDto.graphicsCard = data.productId;
          break;
        }
        case "Processor": {
          this.selectedProcessor = data.data;
          console.log('Primesc procesorul: ', this.selectedProcessor);
          this.products[0].id = this.selectedProcessor.id;
          this.products[0].name = this.selectedProcessor.name;
          this.products[0].price = this.selectedProcessor.price;
          let photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedProcessor.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.products[0].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          console.log('Photo: ', this.products[0].photo);
          this.products[0].description = this.selectedProcessor.producer + " " + this.selectedProcessor.name +
            " " + this.selectedProcessor.cores + " nuclee, " + this.selectedProcessor.threads +
            " threaduri, frecventa de bază: " + this.selectedProcessor.baseFrequency + " Mhz";
          this.total += this.selectedProcessor.price;
          this.configuratorDto.processor = data.productId;
          console.log('Am pus la procesor: ', data.productId);
          break;
        }
        case "RAM": {
          this.selectedRam = data.data;
          this.products[2].id = this.selectedRam.id;
          this.products[2].name = this.selectedRam.name;
          let photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedRam.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.products[2].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.products[2].price = this.selectedRam.price;
          this.products[2].description = this.selectedRam.name + " " + this.selectedRam.type + " " + this.selectedRam.total + " GB, " +
            this.selectedRam.frequency + " Mhz, " + this.selectedRam.format;
          this.total += this.selectedRam.price;

          this.laptopProducts[1].id = this.selectedRam.id;
          this.laptopProducts[1].name = this.selectedRam.name;
          photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedRam.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.laptopProducts[1].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.laptopProducts[1].price = this.selectedRam.price;
          this.laptopProducts[1].description = this.selectedRam.name + " " + this.selectedRam.type + " " + this.selectedRam.total + " GB, " +
            this.selectedRam.frequency + " Mhz, " + this.selectedRam.format;
          this.configuratorDto.ram = data.productId;
          this.laptopTotal += this.selectedRam.price;
          break;
        }
        case "Storage": {
          this.selectedStorage = data.data;
          this.products[3].id = this.selectedStorage.id;
          this.products[3].name = this.selectedStorage.name;
          let photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedStorage.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.products[3].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.products[3].price = this.selectedStorage.price;
          this.products[3].description = this.selectedStorage.type + " " + this.selectedStorage.name + " " +
            this.selectedStorage.capacity;
          this.total += this.selectedStorage.price;

          this.selectedStorage = data.data;
          this.laptopProducts[2].name = this.selectedStorage.name;
          this.laptopProducts[2].id = this.selectedStorage.id;
          photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedStorage.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.laptopProducts[2].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.laptopProducts[2].price = this.selectedStorage.price;
          this.laptopProducts[2].description = this.selectedStorage.type + " " + this.selectedStorage.name + " " +
            this.selectedStorage.capacity;
          this.configuratorDto.storage = data.productId;
          this.laptopTotal += this.selectedStorage.price;
          break;
        }
        case "Motherboard": {
          this.selectedMotherboard = data.data;
          this.products[4].id = this.selectedMotherboard.id;
          this.products[4].name = this.selectedMotherboard.name;
          this.products[4].price = this.selectedMotherboard.price;
          let photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedMotherboard.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.products[4].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.products[4].description = this.selectedMotherboard.name + " " + this.selectedMotherboard.format + " " +
            " " + this.selectedMotherboard.chipsetProducer + " " + this.selectedMotherboard.chipsetModel;
          this.total += this.selectedMotherboard.price;
          this.configuratorDto.motherboard = data.productId;
          break;
        }
        case "Laptop": {
          this.selectedLaptop = data.data;
          this.laptopProducts[0].id = this.selectedLaptop.id;
          this.laptopProducts[0].name = this.selectedLaptop.name;
          this.laptopProducts[0].price = this.selectedLaptop.price;
          let photosModelDTO = new PhotosModelDto();
          photosModelDTO.id = this.selectedLaptop.id;
          photosModelDTO.productType = data.productType;
          this.service.getPhotos(photosModelDTO).subscribe(photos => {
            this.laptopProducts[0].photo = photos.photos.length > 0 ? photos.photos[0] : undefined;
          })
          this.laptopProducts[0].description = this.selectedLaptop.name + ", Procesor " + this.selectedLaptop.processor.name +
            ", Placă video " + this.selectedLaptop.graphicsCard.model;
          this.configuratorDto.laptop = data.productId;
          break;
        }
      }
    });
  }



  backToList() {
    this.eventEmitter.emit(this.cartProducts);
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }

  startConfiguration() {
    this.firstStep = false;
  }

  startLaptopConfiguration() {
    this.secondStep = false;
  }

  addToCart() {
    console.log('Add to cart this.products: ', this.products);
    console.log('Add to cart this.laptopProducts: ', this.laptopProducts);
    if (this.products.length > 0 && !this.firstStep) {
      this.products.forEach(product => {
        if (product.id != null) {
          let cartProduct = new CartDto();
          cartProduct.id = product.id;
          cartProduct.productType = product.productType;
          cartProduct.productNumber = 1;
          cartProduct.stock = product.stock;
          console.log('Intru pe if si adaug: ', product);
          this.cartProducts.push(cartProduct);
        }
      })
    } else if (this.laptopProducts.length > 0 && !this.secondStep) {
      this.laptopProducts.forEach(product => {
        if (product.productType != "Laptop") {
          if (product.id != null) {
            let cartProduct = new CartDto();
            cartProduct.id = product.id;
            cartProduct.productType = product.productType;
            cartProduct.productNumber = 1;
            cartProduct.stock = product.stock;
            console.log('Intru pe else si adaug: ', product);
            this.cartProducts.push(cartProduct);
          }
        }
      })
    }
    console.log('Produse adaugate: ', this.cartProducts);
    this.messageService.add({severity: 'info', summary: 'Produse adăugate su succes', detail: 'Produsele selectate au fost adăugate în coș!'});
  }
}
