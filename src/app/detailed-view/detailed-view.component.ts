import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDto} from "../../dto/product.dto";
import {LicentaService} from "../../services/licenta.service";
import {LaptopDto} from "../../dto/laptop.dto";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  @Input() product: ProductDto;
  @Output() eventEmitter = new EventEmitter<boolean>();
  laptopDto: LaptopDto;

  constructor(private service: LicentaService) {}

  ngOnInit(): void {
    console.log(this.product);
    this.service.getLaptop(this.product.id).subscribe(laptop => {
      this.laptopDto = laptop;
    })
  }

  backToList() {
    this.eventEmitter.emit(true);
  }


}
