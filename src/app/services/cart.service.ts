import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemList : any =[]
  public tiposList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
     return this.tiposList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(product);
    this.tiposList.next(product);
    console.log(this.cartItemList)
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.tiposList.next(this.cartItemList);
    console.log(this.cartItemList)
    this.getTotalPrice();
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product._id=== a._id){
        this.cartItemList.splice(index,1);
      }
    })
    this.tiposList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.tiposList.next(this.cartItemList);
  }
}
