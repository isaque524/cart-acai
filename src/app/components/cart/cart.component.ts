import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  public contarAdicionais: boolean = false;
  public hidden: boolean = false;
  constructor(private cartService: CartService, public router: Router) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  LimparCarrinho() {
    this.cartService.removeAllCart();
  }

  Dowload() {
    var element = document.getElementById('pedido');

    var opt = {
      margin: [10, 10, 10, 10],
      filename: 'pedido.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
    Swal.fire({
      title: 'Enviado com sucesso?',
      text: 'Por favor espere o pdf ser gerado para realizar uma nova compra',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'realizar uma nova compra',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/products']);
        this.cartService.removeAllCart();
      }
    });
  }
}
