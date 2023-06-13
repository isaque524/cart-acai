import { CartService, carrinho } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CarrinhoCompra } from 'src/app/services/cart.service';
import { AcaiSorveteService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  public pegarSabores: any = [];
  public pegarAdicionas: any = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
}
