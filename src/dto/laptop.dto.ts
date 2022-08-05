import {DisplayDto} from "./display.dto";
import {ProcessorDto} from "./processor.dto";
import {GraphicsCardDto} from "./graphics-card.dto";
import {RamDto} from "./ram.dto";
import {StorageDto} from "./storage.dto";

export interface LaptopDto {
  id: number;
  name: string;
  guarantee: number;
  display: DisplayDto;
  processor: ProcessorDto;
  ram: RamDto;
  storage: StorageDto;
  graphicsCard: GraphicsCardDto;
  price: number;
  additionalRamType: string;
}
