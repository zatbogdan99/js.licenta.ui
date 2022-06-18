export interface ProcessorDto {
  id: number;
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
  photo: string;
  price: number;
}
