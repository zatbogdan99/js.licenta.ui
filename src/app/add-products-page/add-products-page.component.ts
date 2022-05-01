import { Component, OnInit } from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {SaveLaptopModel} from "../../dto/save-laptop.model";
import {GraphicsCardDto} from "../../dto/graphics-card.dto";
import {SaveGraphicsCardDto} from "../../dto/save-graphics-card.dto";
import {SaveProcessorDTO} from "../../dto/save-processor.dto";
import {core} from "@angular/compiler";
import {MessageService} from "primeng/api";

interface Product {
  product: string,
  value: number
}

@Component({
  selector: 'app-add-products-page',
  templateUrl: './add-products-page.component.html',
  styleUrls: ['./add-products-page.component.css']
})
export class AddProductsPageComponent implements OnInit {

  products: Product[] = [
    {product: "Laptop", value: 1},
    {product: "PLaca video", value: 2},
    {product: "Procesor", value: 3},
    {product: "Display", value: 4},
    {product: "Inca ceva", value: 5}
  ]
  loading: boolean = false;
  product: number = 1
  laptop: SaveLaptopModel;
  graphicsCardDTO: SaveGraphicsCardDto;
  processorDTO: SaveProcessorDTO;
  name: string;
  waranty: number;
  display: number;
  processor: number;
  ramTotal: number;
  ramType: string;
  ramFrequency: number;
  ramSlots: number;
  storageType: string;
  storageCapacity: number;
  storageInterface: string;
  storageFormFactor: number;
  graphicsCard: number;
  price: number;
  chipset: string;
  model: string;
  capacity: number;
  technology: string;
  type: string;
  producer: string;
  family: string;
  cores: number
  threads: number;
  baseFrequency: number;
  maxTurboFrequency: number;
  l2_cache: number;
  l3_cache: number;
  processor_technology: number;
  integrated_graphics: string;
  uploadedFiles: any[] = [];



  constructor(private service: LicentaService, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log('intram in onInit', this.products);
  }

  saveLaptop() {
    this.laptop = new SaveLaptopModel();
    this.laptop.name = this.name;
    this.laptop.waranty = this.waranty;
    this.laptop.display = this.display;
    this.laptop.processor = this.processor;
    this.laptop.ramTotal = this.ramTotal;
    this.laptop.ramType = this.ramType;
    this.laptop.ramFrequency = this.ramFrequency;
    this.laptop.ramSlots = this.ramSlots;
    this.laptop.storage = this.storageType;
    this.laptop.storageCapacity = this.storageCapacity;
    this.laptop.storageInterface = this.storageInterface;
    this.laptop.storageFormFactor = this.storageFormFactor;
    this.laptop.graphicsCard = this.graphicsCard;
    this.laptop.price = this.price;
    this.laptop.photos = this.uploadedFiles;

    this.service.saveLaptop(this.laptop).subscribe(() => {
      console.log("Laptop saved");
      console.log(this.laptop);
    });
  }

  onChange() {
    console.log(this.product);
  }

  save() {
    switch (this.product) {
      case 1: {
        this.saveLaptop();
        break;
      }
      case 2: {
        this.saveGaphicsCard();
        break;
      }
      case 3: {
        this.saveProcessor();
        break;
      }
    }
  }

  private saveGaphicsCard() {
    this.graphicsCardDTO = new SaveGraphicsCardDto();
    this.graphicsCardDTO.name = this.name;
    this.graphicsCardDTO.type = this.type;
    this.graphicsCardDTO.capacity = this.capacity;
    this.graphicsCardDTO.model = this.model;
    this.graphicsCardDTO.chipset = this.chipset;
    this.graphicsCardDTO.technology = this.technology;

    this.service.saveGraphicsCard(this.graphicsCardDTO).subscribe(() => {
      console.log("Saved graphics card");
    })
  }

  private saveProcessor() {
    this.processorDTO = new SaveProcessorDTO();
    this.processorDTO.name = this.name;
    this.processorDTO.producer = this.producer;
    this.processorDTO.model = this.model;
    this.processorDTO.cores = this.cores;
    this.processorDTO.technology = this.processor_technology;
    this.processorDTO.baseFrequency = this.baseFrequency;
    this.processorDTO.family = this.family;
    this.processorDTO.integratedGraphics = this.integrated_graphics;
    this.processorDTO.l3Cache = this.l3_cache;
    this.processorDTO.l2Cache = this.l2_cache;
    this.processorDTO.threads = this.threads;
    this.processorDTO.maxTurboFrequency = this.maxTurboFrequency;

    this.service.saveProcessor(this.processorDTO).subscribe(() => {
      console.log("Saved processor");
    });
  }

  onSelect(event: any) {
    console.log("intru pe onUpload");
    this.uploadedFiles = [];
    for(let file of event.files) {
      this.enableLoading();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadedFiles.push(reader.result);
        this.disableLoading();
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
        console.log('In on reload', this.uploadedFiles);
      };
    }
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }
}
