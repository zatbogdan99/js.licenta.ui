export class SaveRamDto {
  id: number;
  name: string;
  warranty: number;
  total: number;
  type: string;
  frequency: number;
  format: string;
  forLaptop: number;
  stock: number;
  price: number;
  photos: string[];

  constructor() {
  }
}
