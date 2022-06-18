export class SaveMotherboardDto {
   id: number;
   name: string;
   format: string;
   cpuSocket: number;
   chipsetProducer: string;
   chipsetModel: string;
   supportedCpus: string;
   graphicalInterface: string;
   audioIntegrated: string;
   audioChipset: string;
   integratedNetworkCard: string;
   networkChipset: string;
   sata3Slots: number;
   m2Ports: number;
   ramType: string;
   maxRam: number;
   ramSlotsNumber: number;
   supportedFrequencies: string;
   pciExpress40x16: number;
   pciExpress30x16: number;
   pci_express_x1: number;
   hdmi: number;
   displayPort: number;
   usb20: number;
   usb32gen1TypeA: number;
   usb32gen2TypeA: number;
   usb32gen2TypeC: number;
   rj45Lan: number;
   audioJack: number;
   dvi: number;
   vga: number;
   ps2Mouse: number;
   ps2Keyboard: number;
   photos: string[];
   price: number;
   warranty: number;
   stock: number;

  constructor() {
  }
}
