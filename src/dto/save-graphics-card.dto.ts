export class SaveGraphicsCardDto {
  chipset: string;
  name: string;
  model: string;
  capacity: number;
  technology: string;
  type: string;
  stock: number;
  forLaptop: number;
  photos: string[];
  price: number;
  warranty: number;

  constructor() {
  }
}
