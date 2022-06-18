import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  @Output() eventEmitter = new EventEmitter<boolean>();
  processors: Product[] = [];

  products: ProductDto[] = [];

  rams: Product[] = [];

  motherboards: Product[] = [];

  desktops: Product[] = [];

  storages: Product[] = [];

  graphicsCards: Product[] = [];

  loading: boolean = false;

  selectedProcessor: ProcessorDto;
  selectedRam: RamDto;
  selectedStorage: StorageDto;
  selectedGraphicsCard: GraphicsCardDto;
  selectedMotherboard: MotherboardDto;
  firstStep: boolean = true;
  empty: string = "-";

  constructor(private service: LicentaService, private messageService: MessageService,
              public dialogService: DialogService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadProducts();

    let product = new ProductDto();
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
      let i = 1;
      data.forEach(p => {
        this.graphicsCards.push(new Product(p.description, i++, p.id));
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

    this.enableLoading();
    this.service.getDesktops().subscribe(data => {
      let i = 1;
      data.forEach(p => {
        this.desktops.push(new Product(p.description, i++, p.id));
      })
      this.disableLoading();
    });
  }

  public gotoSelectComponent(product: ProductDto) {
    const ref = this.dialogService.open(SelectComponent, {
      header: 'Selectați componenta de tip ' + product.productType + ' dorită: ',
      width: '70%',
      data: {
        product: product
      }
    });

    ref.onClose.subscribe((data) => {
      console.log("Se apeleaza on close");
      switch (data.productType) {
        case "GraphicsCard": {
          this.selectedGraphicsCard = data.data;
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
            " threaduri, frecventa de bază: " + this.selectedProcessor.baseFrequency;
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
          this.products[2].description = this.selectedRam.name + " " + this.selectedRam.type + " " + this.selectedRam.total + " " +
            this.selectedRam.frequency + " " + this.selectedRam.format;
          break;
        }
        case "Storage": {
          this.selectedStorage = data.data;
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
          break;
        }
      }
    });
  }



  backToList() {
    this.eventEmitter.emit(true);
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
}
