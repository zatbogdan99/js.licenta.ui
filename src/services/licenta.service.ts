import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LaptopDto} from "../dto/laptop.dto";
import {ProductDto} from "../dto/product.dto";

@Injectable({
  providedIn: 'root',
})
export class LicentaService {
  licentaService: any;

  constructor(private http: HttpClient) {

  }

  public getAllProducts(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl(""));
  }

  private getUrl(path: string): string {
    return  "http://localhost:8080/" + path;
  }
}
