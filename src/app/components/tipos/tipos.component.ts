import { adicional } from './../../model/adicional';
('use strict');
import { Component, OnInit } from '@angular/core';
import { PegarSabor } from 'src/app/model/sabores';
import { AdicionaisService } from 'src/app/services/Adicionais.service';

import {
  ItemCarrinho,
  CarrinhoCompra,
  carrinho,
} from 'src/app/services/cart.service';
import { SaboresService } from 'src/app/services/sabores.service';
import { AcaiSorveteService } from 'src/app/services/tipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
})
export class TiposComponent implements OnInit {
  resultados: any = [];
  public clicSorvete: boolean = false;
  itemCarrinho!: ItemCarrinho;
  ItemS: any = [];
  public tiposList: any;
  public SaborList: any;
  public adicionaisList: any;

  constructor(
    private tipo: AcaiSorveteService,
    private sabor: SaboresService,
    private adicionalComp: AdicionaisService
  ) {}

  ngOnInit(): void {
    this.tipo.getAcaiSorveteTodosTipos().subscribe((res) => {
      this.tiposList = res.resultados;
      this.tiposList.forEach((a: any) => {
        Object.assign(a, { quantidade: 1, total: a.preco });
      });
    });
  }

  montarCopo(item: any) {
    this.clicSorvete = true;
    this.itemCarrinho = new ItemCarrinho(
      item.tipo,
      item.capacidade,
      item.preco,
      item.qtd_sabores,
      item.qtd_adicionais
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
    } else [alert('ja foi mane')];
  }

  complementos(item: any) {
    let { qtd_adicionais, adicionais } = this.itemCarrinho.getItem;
    if (adicionais.length < qtd_adicionais) {
      let nome: adicional = { nome: item.nome, imagem: item.url_imagem };
      this.itemCarrinho.pushAdicionais(nome);
    } else [alert('ja foi mane'), console.log(this.itemCarrinho)];
  }
}
