import {Component, Injectable, OnInit} from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../../dto/product.dto";
import {DataViewModule} from 'primeng/dataview';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

@Injectable()
export class MainPageComponent implements OnInit {

  products: any;

  constructor(private service: LicentaService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = new Array<ProductDto>();
    this.service.getAllProducts().subscribe(data => {
      data.forEach(data => {
        this.products?.push(data);
      })
      console.log(this.products);
    }, error => {
      console.error('EROARE la aducerea tuturor produselor');
    })
  }

}
