import {DisplayDto} from "./display.dto";
import {ProcessorDto} from "./processor.dto";
import {GraphicsCardDto} from "./graphics-card.dto";

export class SaveLaptopModel {
  id: number;
  name: string;
  waranty: number;
  display: number;
  processor: number;
  ramTotal: number;
  ramType: string;
  ramFrequency: number;
  ramSlots: number;
  storage: string;
  storageCapacity: number;
  storageInterface: string;
  storageFormFactor: number;
  graphicsCard: number;
  price: number;
  photos: string[];

  constructor() {
  }
}
