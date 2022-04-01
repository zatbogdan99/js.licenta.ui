import {DisplayDto} from "./display.dto";
import {ProcessorDto} from "./processor.dto";
import {GraphicsCardDto} from "./graphics-card.dto";

export interface LaptopDto {
  id: number;
  name: string;
  guarantee: number;
  display: DisplayDto;
  processor: ProcessorDto;
  ramTotal: number;
  ramType: string;
  ramFrequency: number;
  ramSlots: number;
  storage: string;
  storageCapacity: number;
  storageInterface: string;
  storageFormFactor: number;
  graphicsCard: GraphicsCardDto;
}
