import {Component, Input, OnInit} from '@angular/core';
import {ProductDto} from "../../dto/product.dto";
import {LicentaService} from "../../services/licenta.service";
import {ConfiguratorDto} from "../../dto/configurator.dto";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  product: ProductDto;
  products: ProductDto[] = [];
  configurationDTO: ConfiguratorDto = new ConfiguratorDto();
  loading: boolean = false;
  constructor(private service: LicentaService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    this.product = config.data.product;
    this.configurationDTO = config.data.configuratorDto;
    console.log(this.product);
  }

  ngOnInit(): void {
    console.log(this.product.productType);
    switch (this.product.productType) {
      case "Placă video": {
        this.products = [];
        this.enableLoading();
        this.service.getCompatibleGraphicsCards(this.configurationDTO).subscribe(graphicsCards => {
          this.products = graphicsCards;
          this.disableLoading();
        })
        break;
      }
      case "Procesor": {
        this.products = [];
        this.enableLoading();
        this.service.getCompatibleProcessors(this.configurationDTO).subscribe(processors => {
          console.log("Apelez get compatible processors cu ", this.configurationDTO);
          this.products = processors;
          this.disableLoading();
        })
        break;
      }
      case "Memorie RAM": {
        this.products = [];
        this.enableLoading();
        this.service.getCompatibleRams(this.configurationDTO).subscribe(rams => {
          this.products = rams;
          this.disableLoading();
        })
        break;
      }
      case "Stocare": {
        this.products = [];
        this.enableLoading();
        this.service.getCompatibleStorage(this.configurationDTO).subscribe(storages => {
          this.products = storages;
          this.disableLoading();
        })
        break;
      }
      case "Placă de bază": {
        this.products = [];
        this.enableLoading();
        console.log('Asta e configurator DTO: ', this.configurationDTO);
        this.service.getCompatibleMotherboards(this.configurationDTO).subscribe(motherboards => {
          this.products = motherboards;
          this.disableLoading();
        })
        break;
      }
      case "Laptop": {
        this.products = [];
        this.enableLoading();
        this.service.getLaptops().subscribe(laptops => {
          this.products = laptops;
          this.disableLoading();
        })
        break;
      }
    }
    console.log(this.products);
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }

  selectComponent(id: number, productType: string) {
    console.log("Acesta e id-ul: ", id);
    console.log(productType);
    let configuratorHelper = new ConfiguratorHelperDTO();
    configuratorHelper.productType = productType;
    configuratorHelper.configuratorDto = this.configurationDTO;
    switch (productType) {
      case "GraphicsCard": {
        this.service.getGraphicsCard(id).subscribe(data => {
          console.log('Placa video: ', data);
          configuratorHelper.data = data;
          configuratorHelper.productId = data.id;
          this.ref.close(configuratorHelper);
        })
        break;
      }
      case "Processor": {
        this.service.getProcessor(id).subscribe(data => {
          configuratorHelper.data = data;
          console.log('Procesoru: ', data);
          configuratorHelper.productId = data.id;
          this.ref.close(configuratorHelper);
        })
        break;
      }
      case "RAM": {
        this.service.getRamById(id).subscribe(data => {
          configuratorHelper.data = data;
          configuratorHelper.productId = data.id;
          this.ref.close(configuratorHelper);
        })
        break;
      }
      case "Storage": {
        this.service.getStorageById(id).subscribe(data => {
          configuratorHelper.data = data;
          configuratorHelper.productId = data.id;
          this.ref.close(configuratorHelper);
        })
        break;
      }
      case "Motherboard": {
        this.service.getMotherboardById(id).subscribe(data => {
          configuratorHelper.data = data;
          configuratorHelper.productId = data.id;
          console.log('Aleg motherboard si pun pe configurator helper id-ul asta ', data.id);
          this.ref.close(configuratorHelper);
        })
        break;
      }
      case "Laptop": {
        this.service.getLaptop(id).subscribe(data => {
          configuratorHelper.data = data;
          configuratorHelper.productId = data.id;
          this.ref.close(configuratorHelper);
        })
        break;
      }
    }
  }
}

export class ConfiguratorHelperDTO {
  configuratorDto: ConfiguratorDto
  data: any;
  productType: string;
  productId: number;
}
