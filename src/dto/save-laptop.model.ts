import {DisplayDto} from "./display.dto";
import {ProcessorDto} from "./processor.dto";
import {GraphicsCardDto} from "./graphics-card.dto";

export class SaveLaptopModel {
  id: number;
  name: string;
  warranty: number;
  display: number;
  processor: number;
  ram: number;
  storage: number;
  graphicsCard: number;
  price: number;
  photos: string[];

  constructor() {
  }
}
