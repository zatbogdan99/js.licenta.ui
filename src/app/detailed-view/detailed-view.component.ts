import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDto} from "../../dto/product.dto";
import {LicentaService} from "../../services/licenta.service";
import {LaptopDto} from "../../dto/laptop.dto";
import {PhotosDto} from "../../dto/photos.dto";
import {GraphicsCardDto} from "../../dto/graphics-card.dto";
import {SaveMotherboardDto} from "../../dto/save-motherboard.dto";
import {ProcessorDto} from "../../dto/processor.dto";
import {SaveRamDto} from "../../dto/save-ram.dto";
import {SaveStorageDto} from "../../dto/save-storage.dto";
import {StorageDto} from "../../dto/storage.dto";
import {RamDto} from "../../dto/ram.dto";
import {MotherboardDto} from "../../dto/motherboard.dto";
import {PhotosModelDto} from "../../dto/photos.model.dto";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  @Input() product: ProductDto;
  @Output() eventEmitter = new EventEmitter<boolean>();
  laptopDto: LaptopDto;
  graphicsCardDto: GraphicsCardDto;
  motherboardDto: MotherboardDto;
  processorDto: ProcessorDto;
  ramDto: RamDto;
  storageDto: StorageDto;
  photos: PhotosDto;
  images: any[];

  constructor(private service: LicentaService) {}

  ngOnInit(): void {
    console.log(this.product);
    switch (this.product.productType) {
      case "GraphicsCard": {
        this.service.getGraphicsCard(this.product.id).subscribe(graphicsCard => {
          this.graphicsCardDto = graphicsCard;
          console.log("A fost graphics card: ", this.graphicsCardDto);
        })
        break;
      }
      case "Laptop": {
        this.service.getLaptop(this.product.id).subscribe(laptop => {
          this.laptopDto = laptop;
          console.log("A fost laptop: ", this.laptopDto);
        })
        break;
      }
      case "Procesor": {
        this.service.getProcessor(this.product.id).subscribe(processor => {
          this.processorDto = processor;
          console.log("A fost procesor: ", this.processorDto);
        })
        break;
      }
      case "RAM": {
        this.service.getRamById(this.product.id).subscribe(ram => {
          this.ramDto = ram;
          console.log("A fost ram: ", this.ramDto);
        })
        break;
      }
      case "Storage": {
        this.service.getStorageById(this.product.id).subscribe(storage => {
          this.storageDto = storage;
          console.log("A fost storage: ", this.storageDto);
        })
        break;
      }
      case "Motherboard": {
        this.service.getMotherboardById(this.product.id).subscribe(motherboard => {
          this.motherboardDto = motherboard;
          console.log("A fost motherboard: ", this.motherboardDto);
        })
        break;
      }
    }
    let photosModelDto = new PhotosModelDto();
    photosModelDto.id = this.product.id;
    photosModelDto.productType = this.product.productType;
    this.service.getPhotos(photosModelDto).subscribe(photos => {
      this.photos = photos;
      this.images = this.photos.photos;
    })
  }

  backToList() {
    this.eventEmitter.emit(true);
  }


}
