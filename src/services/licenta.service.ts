import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LaptopDto} from "../dto/laptop.dto";
import {ProductDto} from "../dto/product.dto";
import {SaveLaptopModel} from "../dto/save-laptop.model";
import {SaveGraphicsCardDto} from "../dto/save-graphics-card.dto";
import {SaveProcessorDTO} from "../dto/save-processor.dto";

@Injectable({
  providedIn: 'root',
})
export class LicentaService {
  constructor(private http: HttpClient) {

  }

  public getAllProducts(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl(""));
  }

  public saveLaptop(laptop: SaveLaptopModel) {
    return this.http.post<SaveLaptopModel>(this.getUrl("save-laptop"), laptop);
  }

  public saveGraphicsCard(graphicsCard: SaveGraphicsCardDto) {
    return this.http.post<SaveGraphicsCardDto>(this.getUrl("save-graphics-card"), graphicsCard);
  }

  private getUrl(path: string): string {
    return  "http://localhost:8080/" + path;
  }

  public saveProcessor(processor: SaveProcessorDTO) {
    return this.http.post<SaveProcessorDTO>(this.getUrl("save-processor"), processor);
  }
}
