import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDto} from "../../dto/product.dto";
import {LicentaService} from "../../services/licenta.service";
import {LaptopDto} from "../../dto/laptop.dto";
import {PhotosDto} from "../../dto/photos.dto";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  @Input() product: ProductDto;
  @Output() eventEmitter = new EventEmitter<boolean>();
  laptopDto: LaptopDto;
  photos: PhotosDto;
  images: any[];

  constructor(private service: LicentaService) {}

  ngOnInit(): void {
    console.log(this.product);
    this.service.getLaptop(this.product.id).subscribe(laptop => {
      this.laptopDto = laptop;
    })
    this.service.getPhotos(this.product.id).subscribe(photos => {
      this.photos = photos;
      this.images = this.photos.photos;
    })
  }

  backToList() {
    this.eventEmitter.emit(true);
  }


}
