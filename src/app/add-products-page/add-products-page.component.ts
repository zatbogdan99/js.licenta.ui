import { Component, OnInit } from '@angular/core';
import {LicentaService} from "../../services/licenta.service";
import {SaveLaptopModel} from "../../dto/save-laptop.model";
import {GraphicsCardDto} from "../../dto/graphics-card.dto";
import {SaveGraphicsCardDto} from "../../dto/save-graphics-card.dto";
import {SaveProcessorDTO} from "../../dto/save-processor.dto";
import {core} from "@angular/compiler";
import {MessageService} from "primeng/api";
import {SaveDisplayDto} from "../../dto/save-display.dto";
import {ProductDto} from "../../dto/product.dto";
import {SaveStorageDto} from "../../dto/save-storage.dto";
import {SaveRamDto} from "../../dto/save-ram.dto";
import {SaveMotherboardDto} from "../../dto/save-motherboard.dto";

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

class GeneralProduct {
  product: string;
  value: number;

  constructor(product: string, value: number, productId: number) {
    this.product = product;
    this.value = value;
  }
}

@Component({
  selector: 'app-add-products-page',
  templateUrl: './add-products-page.component.html',
  styleUrls: ['./add-products-page.component.css']
})
export class AddProductsPageComponent implements OnInit {

  products: GeneralProduct[] = [
    {product: "Laptop", value: 1},
    {product: "Placa video", value: 2},
    {product: "Procesor", value: 3},
    {product: "Display", value: 4},
    {product: "Storage", value: 5},
    {product: "Ram", value: 6},
    {product: "Motherboard", value: 7}
  ]
  processors: Product[] = [];

  rams: Product[] = [];

  motherboards: Product[] = [];

  storages: Product[] = [];

  graphicsCards: Product[] = [];
  displays: Product[] = [];
  loading: boolean = false;
  product: number = 1
  laptop: SaveLaptopModel;
  graphicsCardDTO: SaveGraphicsCardDto;
  motherboardDTO: SaveMotherboardDto;
  processorDTO: SaveProcessorDTO;
  displayDTO: SaveDisplayDto;
  ramDTO: SaveRamDto;
  storageDTO: SaveStorageDto;
  name: string;
  warranty: number;
  display: number;
  processor: number;
  ram: number;
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
  brightness: number;
  freesync: number;
  gsync: number;
  refreshRate: number;
  resolution: string;
  screenSize: number;
  selectedStorage: number;
  speed: number;
  storageWarranty: number;
  ramFormat: string;
  ramForLaptop: number;
  processorForLaptop: number;
  motherboardFormat: string;
  cpuSocket: number;
  chipsetProducer: string;
  chipsetModel: string;
  supportedCpus: string;
  graphicalInterface: string;
  audioIntegrated: string;
  chipsetAudio: string;
  integratedNetworkCard: string;
  networkChipset: string;
  sata3Slots: number;
  m2Ports: number;
  motherboardRamType: string;
  maxRam: number;
  motherboardRamSlots: number;
  supportedFrequencies: string;
  pciExpress40x16: number;
  pciExpress30x16: number;
  pciExpressX1: number;
  hdmi: number;
  displayPort: number;
  usb20: number;
  usb32Gen1TypeA: number;
  usb32Gen2TypeA: number;
  usb43Gen2TypeC: number;
  rj45Lan: number;
  audioJack: number;
  dvi: number;
  vga: number;
  ps2Mouse: number;
  ps2Keyboard: number;




  constructor(private service: LicentaService, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log('intram in onInit', this.products);
    this.enableLoading();
    this.service.getDisplays().subscribe(data => {
      let i = 1;
      data.forEach(p => {
        this.displays.push(new Product(p.description, i++, p.id));
      })
      this.disableLoading();
    });
    console.log("Displays: ", this.displays);

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


  }

  saveLaptop() {
    this.laptop = new SaveLaptopModel();
    this.laptop.name = this.name;
    this.laptop.warranty = this.warranty;
    this.laptop.display = this.display;
    this.laptop.processor = this.processors[this.processor - 1].productId;
    this.laptop.ram = this.rams[this.ram - 1].productId;
    this.laptop.storage = this.storages[this.selectedStorage - 1].productId;
    console.log(this.graphicsCard);
    console.log(this.graphicsCards);
    this.laptop.graphicsCard = this.graphicsCards[this.graphicsCard - 1].productId;
    this.laptop.price = this.price;
    this.laptop.photos = this.uploadedFiles;

    this.service.saveLaptop(this.laptop).subscribe(() => {
      console.log("Laptop saved");
      console.log(this.laptop);
    });

    this.messageService.add({severity: 'info', summary: 'Laptop saved', detail: ''});
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
      case 4: {
        this.saveDisplay();
        break;
      }
      case 5: {
        this.saveStorage();
        break;
      }
      case 6: {
        this.saveRam();
        break;
      }
      case 7: {
        this.saveMotherboard();
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
    this.graphicsCardDTO.photos = this.uploadedFiles;

    this.service.saveGraphicsCard(this.graphicsCardDTO).subscribe(() => {
      console.log("Saved graphics card");
    })

    this.messageService.add({severity: 'info', summary: 'Placa video salvata cu succes!', detail: ''});
  }

  private saveMotherboard() {
    this.motherboardDTO = new SaveMotherboardDto();
    this.motherboardDTO.dvi = this.dvi;
    this.motherboardDTO.name = this.name;
    this.motherboardDTO.price = this.price;
    this.motherboardDTO.format = this.motherboardFormat;
    this.motherboardDTO.audioChipset = this.chipsetAudio;
    this.motherboardDTO.audioIntegrated = this.audioIntegrated;
    this.motherboardDTO.audioJack = this.audioJack;
    this.motherboardDTO.chipsetModel = this.chipsetModel;
    this.motherboardDTO.chipsetProducer = this.chipsetProducer;
    this.motherboardDTO.cpuSocket = this.cpuSocket;
    this.motherboardDTO.displayPort = this.displayPort;
    this.motherboardDTO.graphicalInterface = this.graphicalInterface;
    this.motherboardDTO.hdmi = this.hdmi;
    this.motherboardDTO.integratedNetworkCard = this.integratedNetworkCard;
    this.motherboardDTO.m2Ports = this.m2Ports;
    this.motherboardDTO.maxRam = this.maxRam;
    this.motherboardDTO.networkChipset = this.networkChipset;
    this.motherboardDTO.pci_express_x1 = this.pciExpressX1;
    this.motherboardDTO.pciExpress30x16 = this.pciExpress30x16;
    this.motherboardDTO.pciExpress40x16 = this.pciExpress40x16;
    this.motherboardDTO.ps2Keyboard = this.ps2Keyboard;
    this.motherboardDTO.ps2Mouse = this.ps2Mouse;
    this.motherboardDTO.photos = this.uploadedFiles;
    this.motherboardDTO.vga = this.vga;
    this.motherboardDTO.rj45Lan = this.rj45Lan;
    this.motherboardDTO.usb20 = this.usb20;
    this.motherboardDTO.usb32gen1TypeA = this.usb32Gen1TypeA;
    this.motherboardDTO.usb32gen2TypeA = this.usb32Gen2TypeA;
    this.motherboardDTO.usb32gen2TypeC = this.usb43Gen2TypeC;
    this.motherboardDTO.supportedCpus = this.supportedCpus;
    this.motherboardDTO.sata3Slots = this.sata3Slots;
    this.motherboardDTO.m2Ports = this.m2Ports;
    this.motherboardDTO.ramType = this.ramType;
    this.motherboardDTO.ramSlotsNumber = this.ramSlots;
    this.motherboardDTO.supportedFrequencies = this.supportedFrequencies;
    this.motherboardDTO.warranty = this.warranty;
    this.motherboardDTO.ramType = this.motherboardRamType;
    this.motherboardDTO.ramSlotsNumber = this.motherboardRamSlots;

    this.service.saveMotherboard(this.motherboardDTO).subscribe(() => {
      console.log("Saved motherboard");
    });

    this.messageService.add({severity: 'info', summary: 'Placă de bază salvată cu succes!', detail: ''});
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
    this.processorDTO.photos = this.uploadedFiles;
    this.processorDTO.forLaptop = this.processorForLaptop;

    this.service.saveProcessor(this.processorDTO).subscribe(() => {
      console.log("Saved processor");
    });

    this.messageService.add({severity: 'info', summary: 'Procesor salvat cu succes!', detail: ''});
  }

  private saveStorage() {
    this.storageDTO = new SaveStorageDto();
    this.storageDTO.name = this.name;
    this.storageDTO.storage_interface = this.storageInterface;
    this.storageDTO.type = this.storageType;
    this.storageDTO.capacity = this.storageCapacity;
    this.storageDTO.warranty = this.storageWarranty;
    this.storageDTO.speed = this.speed;
    this.storageDTO.photos = this.uploadedFiles;

    this.service.saveStorage(this.storageDTO).subscribe(() => {
      console.log("Saved storage");
    })

    this.messageService.add({severity: 'info', summary: 'SSD/HDD salvat cu succes!', detail: ''});
  }

  private saveDisplay() {
    this.displayDTO = new SaveDisplayDto();
    this.displayDTO.gsync = this.gsync;
    this.displayDTO.freesync = this.freesync;
    this.displayDTO.brightness = this.brightness;
    this.displayDTO.refreshRate = this.refreshRate;
    this.displayDTO.resolution = this.resolution;
    this.displayDTO.screenSize = this.screenSize;

    this.service.saveDisplay(this.displayDTO).subscribe(() => {
      console.log("Saved display");
    })

    this.messageService.add({severity: 'info', summary: 'Display salvat cu succes!', detail: ''});
  }

  private saveRam() {
    this.ramDTO = new SaveRamDto();
    this.ramDTO.name = this.name;
    this.ramDTO.warranty = this.warranty;
    this.ramDTO.type = this.ramType;
    this.ramDTO.format = this.ramFormat;
    this.ramDTO.forLaptop = this.ramForLaptop;
    this.ramDTO.frequency = this.ramFrequency
    this.ramDTO.total = this.ramTotal;
    this.ramDTO.photos = this.uploadedFiles;

    this.service.saveRam(this.ramDTO).subscribe(() => {
      console.log("Saved ram");
    })

    this.messageService.add({severity: 'info', summary: 'RAM salvat cu succes!', detail: ''});
  }

  onSelect(event: any) {
    console.log("intru pe onUpload");
    this.uploadedFiles = [];
    for(let file of event.files) {
      // this.enableLoading();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadedFiles.push(reader.result);
        // this.disableLoading();
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
        console.log('In on reload', this.uploadedFiles);
      };
    }
    console.log(this.uploadedFiles);
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }
}
