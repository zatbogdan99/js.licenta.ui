import { Component, OnInit } from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {UpdateProductDto} from "../../dto/update-product.dto";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  products: any;
  loading: boolean;
  stock: number;
  modifyStock: boolean;
  selectedProduct: number;
  private selectedProductType: string;

  constructor(private service: LicentaService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
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

  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }

  showInput(id: number, productType: string) {
    this.selectedProduct = id;
    this.selectedProductType = productType;
    this.modifyStock = true;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async modify() {
    let updateProductDto = new UpdateProductDto();
    updateProductDto.selectedProduct = this.selectedProduct;
    updateProductDto.selectedProductType = this.selectedProductType;
    updateProductDto.value = this.stock;
    this.enableLoading();
    this.service.updateProductStock(updateProductDto).subscribe(async () => {
      console.log('updated');
    });

    await this.delay(1000);
    this.disableLoading();

    this.messageService.add({severity: 'info', summary: 'Stoc actualizat cu succes!', detail: ''});
    this.modifyStock = false;
    this.stock = 0;

    this.enableLoading();
    this.products = [];
    this.getAllProducts();
  }
}
