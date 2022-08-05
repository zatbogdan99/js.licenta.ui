import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {LaptopDto} from "../dto/laptop.dto";
import {ProductDto} from "../dto/product.dto";
import {SaveLaptopModel} from "../dto/save-laptop.model";
import {SaveGraphicsCardDto} from "../dto/save-graphics-card.dto";
import {SaveProcessorDTO} from "../dto/save-processor.dto";
import {SaveDisplayDto} from "../dto/save-display.dto";
import {FilterDto} from "../dto/filter.dto";
import {SaveStorageDto} from "../dto/save-storage.dto";
import {SaveRamDto} from "../dto/save-ram.dto";
import {PhotosDto} from "../dto/photos.dto";
import {SaveMotherboardDto} from "../dto/save-motherboard.dto";
import {GraphicsCardDto} from "../dto/graphics-card.dto";
import {ProcessorDto} from "../dto/processor.dto";
import {StorageDto} from "../dto/storage.dto";
import {RamDto} from "../dto/ram.dto";
import {MotherboardDto} from "../dto/motherboard.dto";
import {PhotosModelDto} from "../dto/photos.model.dto";
import {DesktopDto} from "../dto/desktop.dto";
import {FullDesktopDto} from "../dto/full-desktop.dto";
import {UpdateProductDto} from "../dto/update-product.dto";
import {ConfiguratorDto} from "../dto/configurator.dto";
import {RemoveProductDto} from "../dto/remove-product.dto";
import {CartDto} from "../dto/cart.dto";

@Injectable({
  providedIn: 'root',
})
export class LicentaService {
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(private http: HttpClient) {

  }

  refreshPage() {
    this.subjectNotifier.next(null);
  }

  public getAllProducts(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("load-products"));
  }

  public getAllProductsInCart(cartProducts: Array<CartDto>): Observable<Array<ProductDto>> {
      return this.http.post<Array<ProductDto>>(this.getUrl("get-cart-products"), cartProducts);
  }

  public updateProducts(filters: FilterDto): Observable<Array<ProductDto>> {
    return this.http.post<Array<ProductDto>>(this.getUrl("update-products"), filters);
  }

  public getLaptop(id: number): Observable<LaptopDto> {
    return this.http.post<LaptopDto>(this.getUrl("get-laptop"), id);
  }

  public getProcessor(id: number): Observable<ProcessorDto> {
    return this.http.post<ProcessorDto>(this.getUrl("get-processor"), id);
  }

  public getRamById(id: number): Observable<RamDto> {
    return this.http.post<RamDto>(this.getUrl("get-ram-by-id"), id);
  }

  public getStorageById(id: number): Observable<StorageDto> {
    return this.http.post<StorageDto>(this.getUrl("get-storage-by-id"), id);
  }

  getMotherboardById(id: number): Observable<MotherboardDto> {
    return this.http.post<MotherboardDto>(this.getUrl("get-motherboard-by-id"), id);
  }

  getDesktop(id: number): Observable<FullDesktopDto> {
    return  this.http.post<FullDesktopDto>(this.getUrl("get-desktop"), id);
  }

  public getGraphicsCard(id: number): Observable<GraphicsCardDto> {
    return this.http.post<GraphicsCardDto>(this.getUrl("get-graphics-card"), id);
  }

  public getPhotos(photosModelDto: PhotosModelDto): Observable<PhotosDto> {
    return this.http.post<PhotosDto>(this.getUrl("get-photos"), photosModelDto);
  }

  public saveLaptop(laptop: SaveLaptopModel) {
    return this.http.post<SaveLaptopModel>(this.getUrl("save-laptop"), laptop);
  }

  public saveGraphicsCard(graphicsCard: SaveGraphicsCardDto) {
    return this.http.post<SaveGraphicsCardDto>(this.getUrl("save-graphics-card"), graphicsCard);
  }

  public saveMotherboard(graphicsCard: SaveMotherboardDto) {
    return this.http.post<SaveMotherboardDto>(this.getUrl("save-motherboard"), graphicsCard);
  }

  private getUrl(path: string): string {
    return  "http://localhost:8081/" + path;
  }

  public saveProcessor(processor: SaveProcessorDTO) {
    return this.http.post<SaveProcessorDTO>(this.getUrl("save-processor"), processor);
  }

  public saveDisplay(display: SaveDisplayDto) {
    return this.http.post<SaveDisplayDto>(this.getUrl("save-display"), display);
  }

  public saveRam(ram: SaveRamDto) {
    return this.http.post<SaveRamDto>(this.getUrl("save-ram"), ram);
  }

  public getCompatibleProcessors(configuratorDTO: ConfiguratorDto): Observable<Array<ProductDto>> {
    return this.http.post<Array<ProductDto>>(this.getUrl("get-compatible-processors"), configuratorDTO);
  }

  public getCompatibleGraphicsCards(configurationDTO: ConfiguratorDto): Observable<Array<ProductDto>> {
    return this.http.post<Array<ProductDto>>(this.getUrl("get-compatible-graphics-cards"), configurationDTO);
  }

  public getCompatibleRams(configurationDTO: ConfiguratorDto): Observable<Array<ProductDto>> {
    return this.http.post<Array<ProductDto>>(this.getUrl("get-compatible-rams"), configurationDTO);
  }

  public getCompatibleStorage(configurationDTO: ConfiguratorDto): Observable<Array<ProductDto>> {
    return this.http.post<Array<ProductDto>>(this.getUrl("get-compatible-storages"), configurationDTO);
  }

  public getCompatibleMotherboards(configurationDTO: ConfiguratorDto) {
    return this.http.post<Array<ProductDto>>(this.getUrl("get-compatible-motherboards"), configurationDTO);
  }

  public getDisplays(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-displays"));
  }

  public getProcessors(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-processors"));
  }

  public getGraphicCards(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-graphic-cards"));
  }

  public getStorage(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-storage"));
  }

  public getDesktops(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-desktops"));
  }

  public getLaptops(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-laptops"));
  }

  public getRam(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-ram"));
  }

  public getMotherboard(): Observable<Array<ProductDto>> {
    return this.http.get<any>(this.getUrl("get-motherboard"));
  }

  public saveStorage(storageDTO: SaveStorageDto) {
    return this.http.post<SaveStorageDto>(this.getUrl("save-storage"), storageDTO);
  }

  public saveDesktop(desktopDTO: DesktopDto) {
    return this.http.post<DesktopDto>(this.getUrl("save-desktop"), desktopDTO);
  }

  public updateProductStock(updateProductDto: UpdateProductDto) {
    return this.http.post<UpdateProductDto>(this.getUrl("update-product-stock"), updateProductDto);
  }

  public removeProduct(model: RemoveProductDto) {
    return this.http.post<RemoveProductDto>(this.getUrl("remove-product"), model);
  }
}
