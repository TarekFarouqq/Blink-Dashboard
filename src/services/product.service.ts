import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { InsertProductDTO } from '../models/insert-product-dto';
import { Product } from '../models/product';
import { ReadFilterAttributes } from '../models/read-filter-attributes';
import { ReviewSuppliedProducts } from '../models/review-supplied-products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient : HttpClient) { }
  private apiUrl=environment.apiUrl;
  GetAll():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl + '/product');
  }
  GetById(id:number):Observable<Product>{
    return this.httpClient.get<Product>(this.apiUrl + '/product/' + id);
  }
  GetTotalPages(pgSize:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/product/GetPagesCount/${pgSize}`);
  }
  GetPagginatedProducts(pgNumber:number,pgSize:number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl + '/product/GetAllWithPaging/' + pgNumber + '/' + pgSize);
  }
  GetFilteredProducts(filter:string,pgNumber:number,pgSize:number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl + '/product/GetFilteredProducts/' + filter + '/' + pgNumber + '/' + pgSize);
  }
  InsertProduct(product:FormData):Observable<any>{
    return this.httpClient.post(this.apiUrl + '/product',product);
  }
  UpdateProduct(id:number, product:FormData):Observable<any>{
    return this.httpClient.put(this.apiUrl + `/product/${id}`,product);
  }
  DeleteProduct(id:number):Observable<any>{
    return this.httpClient.delete(this.apiUrl + '/product/' + id);
  }
  GetFilterAttributes():Observable<ReadFilterAttributes[]>{
    return this.httpClient.get<ReadFilterAttributes[]>(`${this.apiUrl}/product/GetFilterAttributes`);
  }
  AddProductAttribute(productId:number, productAttribute:FormData):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/product/AddProductAttribute/${productId}`,productAttribute);
  }
  GetProductAttributes(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/product/GetProductAttributes/${id}`);
  }
  GetChildCategory():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/Category/GetChildCategories`);
  }
  GetProductStock(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/product/GetProductStock/${id}`);
  }
  AddReviewSuppliedProduct(formGroup:FormData):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/product/AddRequestSuppliedProduct`,formGroup);
  }
  GetReviewSuppliedProducts():Observable<ReviewSuppliedProducts[]>{
    return this.httpClient.get<ReviewSuppliedProducts[]>(`${this.apiUrl}/product/GetSuppliedProducts`);
  }

}
