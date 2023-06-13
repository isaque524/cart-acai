import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PegarSabor } from '../model/sabores';
import { Listadicional } from '../model/adicional';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public tiposList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getProducts() {
    return this.tiposList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.tiposList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.tiposList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.tiposList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.tiposList.next(this.cartItemList);
  }
}

export class ItemCarrinho {
  private id!: number;
  private tipo: string;
  private capacidade: number;
  private preco: number;
  private qtd_sabores: number;
  private qtd_adicionais: number;
  private quantidade: number;
  private total: number;
  private sabores: Array<PegarSabor>;
  private adicionais: Array<Listadicional>;

  constructor(
    tipo: string,
    capacidade: number,
    preco: number,
    qtd_sabores: number,
    qtd_adicionais: number,
    quantidade: number,
    total: number
  ) {
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.preco = preco;
    this.qtd_sabores = qtd_sabores;
    this.qtd_adicionais = qtd_adicionais;
    this.quantidade = quantidade;
    this.total = total;
    this.sabores = [];
    this.adicionais = [];
  }

  // Cópdia das propriedades
  get getItem(): any {
    return { ...this };
  }

  // Obter o id
  get getId(): number {
    return this.id;
  }
  // Setar o id
  setId(id: number): void {
    this.id = id;
  }

  // Adicionar um sabor
  public pushSabor(sabor: PegarSabor): void {
    this.sabores.push(sabor);
  }
  // Apagar um sabor
  public deleteSabor(nome: PegarSabor['tipo']): void {
    let index = this.sabores.findIndex((sabor) => sabor.nome == nome);
    this.sabores.splice(index, 1);
  }

  // Adicionar um adicional no copo
  public pushAdicionais(nome: Listadicional): void {
    this.adicionais.push(nome);
  }
  // Remover um adicional do copo
  public deleteAdicionais(nome: Listadicional): void {
    let index = this.adicionais.findIndex((adicional) => adicional == nome);
    this.adicionais.splice(index, 1);
  }
}

export class CarrinhoCompra {
  private items: Array<ItemCarrinho>;
  private id: number;

  constructor() {
    this.items = [];
    this.id = 1;
  }

  // Obter uma cópia dos items
  get getCarrinho(): Array<any> {
    return [...this.items];
  }
  // Adicionar um item no carrinho
  public pushCarrinho(item: ItemCarrinho) {
    item.setId(this.id);
    this.items.push(item);
    this.id++;
  }
  // Apagar item do carrinho
  public deleteCarrinho(item: ItemCarrinho) {
    let index = this.items.findIndex((x) => x.getId == item.getId);
    this.items.splice(index, 1);
  }

  // Obter a soma total do carrinho
  get getPreco(): number {
    return this.items.reduce((soma, item) => soma + item.getItem.preco, 0);
  }

  get getQuantidade(): number {
    return this.items.reduce((soma, item) => soma + item.getItem.quantidade, 0);
  }
}

export let carrinho = new CarrinhoCompra();
