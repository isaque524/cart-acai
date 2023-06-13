import { carrinho } from './../../services/cart.service';
import { Listadicional } from './../../model/adicional';
('use strict');
import { Component, OnInit } from '@angular/core';
import { PegarSabor } from 'src/app/model/sabores';
import { AdicionaisService } from 'src/app/services/Adicionais.service';

import { ItemCarrinho, CartService } from 'src/app/services/cart.service';
import { SaboresService } from 'src/app/services/sabores.service';
import { AcaiSorveteService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
})
export class TiposComponent implements OnInit {
  resultados: any = [];
  public clicSorvete: boolean = false;
  public clicbtnSorvete: boolean = false;
  public clicbtnAdc: boolean = false;
  itemCarrinho!: ItemCarrinho;
  ItemS: any = [];
  public tiposList: any;
  public tiposListclone: any;
  public SaborList: any;
  public adicionaisList: any;

  constructor(
    private tipo: AcaiSorveteService,
    private sabor: SaboresService,
    private adicionalComp: AdicionaisService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.tipo.getAcaiSorveteTodosTipos().subscribe((res) => {
      this.tiposList = res.resultados;
      this.tiposListclone = this.tiposList;
      this.tiposList.forEach((a: any) => {
        Object.assign(a, { quantidade: 1, total: a.preco });
      });
    });
  }

  montarCopo(item: any) {
    this.clicSorvete = true;
    this.clicbtnSorvete = false;
    this.clicbtnAdc = false;
    this.itemCarrinho = new ItemCarrinho(
      item.tipo,
      item.capacidade,
      item.preco,
      item.qtd_sabores,
      item.qtd_adicionais,
      item.quantidade,
      item.total
    );

    this.chamarSorvete();
    this.chamarComplimentosAdicionais();
  }

  chamarSorvete() {
    this.sabor.getSabores().subscribe((res) => {
      this.SaborList = res.resultados;
    });
  }
  chamarComplimentosAdicionais(): void {
    this.adicionaisList = this.adicionalComp.getAll();
  }

  adicionarSorvete(item: any) {
    let { qtd_sabores, sabores } = this.itemCarrinho.getItem;
    if (sabores.length < qtd_sabores) {
      let sabor: PegarSabor = { nome: item.nome, tipo: item.tipo };
      this.itemCarrinho.pushSabor(sabor);
    } else [alert('ja foi mane'), (this.clicbtnSorvete = true)];
  }

  complementos(item: any) {
    let { qtd_adicionais, adicionais } = this.itemCarrinho.getItem;
    if (adicionais.length < qtd_adicionais) {
      let nome: Listadicional = { nome: item.nome };
      this.itemCarrinho.pushAdicionais(nome);
    } else [alert('ja foi mane'), (this.clicbtnAdc = true)];
  }
  montarCarrinho() {
    let { sabores } = this.itemCarrinho.getItem;
    if (sabores.length <= 0) {
      alert('Adicione pelo menos um sabor');
    } else {
      carrinho.pushCarrinho(this.itemCarrinho);
      this.cartService.addtoCart(this.itemCarrinho);
      alert('add');
      this.clicSorvete = false;
    }
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.tiposList = this.tiposListclone.filter((tipos: any) => {
      return tipos._id.toLowerCase().includes(value);
    });
  }
}
