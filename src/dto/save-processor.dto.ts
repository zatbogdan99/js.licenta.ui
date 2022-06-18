import {DisplayDto} from "./display.dto";
import {ProcessorDto} from "./processor.dto";
import {GraphicsCardDto} from "./graphics-card.dto";

export class SaveProcessorDTO {
  producer: string;
  name: string;
  family: string;
  model: string;
  cores: number;
  threads: number;
  baseFrequency: number;
  maxTurboFrequency: number;
  l2Cache: number;
  l3Cache: number;
  technology: number;
  integratedGraphics: string;
  forLaptop: number;
  stock: number;
  price: number;
  photos: string[];

  constructor() {
  }
}
