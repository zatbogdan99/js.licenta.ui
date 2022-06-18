import {ProcessorDto} from "./processor.dto";
import {RamDto} from "./ram.dto";
import {StorageDto} from "./storage.dto";
import {GraphicsCardDto} from "./graphics-card.dto";

export class FullDesktopDto {
  id: number;
  name: string;
  warranty: number;
  photo: string;
  processor: ProcessorDto;
  ram: RamDto;
  storage: StorageDto;
  graphicsCard: GraphicsCardDto;
  type: string;
  photos: string[];
}
