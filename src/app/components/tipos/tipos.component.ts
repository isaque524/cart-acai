import { Listadicional } from './../../model/adicional';
('use strict');
import { Component, OnInit } from '@angular/core';
import { PegarSabor } from 'src/app/model/sabores';
import { AdicionaisService } from 'src/app/services/Adicionais.service';

import { ItemCarrinho, CartService } from 'src/app/services/cart.service';
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
  public LigaAcordion: boolean = false;
  public reiniciarClic: boolean = false;
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
    this.LigaAcordion = true;
    this.reiniciarClic = false;
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

  adicionarSorvete(item: any) {
    let { qtd_sabores, sabores } = this.itemCarrinho.getItem;
    if (sabores.length < qtd_sabores) {
      item.clicado = true;
      let sabor: PegarSabor = { nome: item.nome, tipo: item.tipo };
      this.itemCarrinho.pushSabor(sabor);
    } else
      [
        Swal.fire({
          title: 'Voce atingiu a quantidade maxima de sabores!',
          icon: 'info',
          text: 'Delete um sabor para adicionar outro',
        }),
      ];
  }

  removerSorvete(item: any) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar??',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        item.clicado = false;
        let sabor: PegarSabor = { nome: item.nome, tipo: item.tipo };
        this.itemCarrinho.deleteSabor(sabor);

        Swal.fire('Deletado!', '', 'success');
      }
    });
  }

  /* clicAdd(item: any, index: number) {
    item.clicado = true;
  } */

  /* clicremover(item: any, index: number) {
    item.clicado = false;
  } */

  chamarComplimentosAdicionais(): void {
    this.adicionaisList = this.adicionalComp.getAll();
  }

  adicionarComplementos(item: any) {
    let { qtd_adicionais, adicionais } = this.itemCarrinho.getItem;
    if (adicionais.length < qtd_adicionais) {
      item.clicado = true;
      let nome: Listadicional = { nome: item.nome };
      this.itemCarrinho.pushAdicionais(nome);
    } else
      [
        Swal.fire({
          title: 'Voce atingiu a quantidade maxima de sabores!',
          icon: 'info',
          text: 'Delete um sabor para adicionar outro',
        }),
      ];
  }

  removerComplementos(item: any) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar??',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        item.clicado = false;
        let adicional: Listadicional = { nome: item.nome };
        this.itemCarrinho.deleteAdicionais(adicional);

        Swal.fire('Deletado!', '', 'success');
      }
    });
  }

  montarCarrinho() {
    let { sabores } = this.itemCarrinho.getItem;
    if (sabores.length <= 0) {
      Swal.fire({
        title: 'Adicione pelo menos um sabor',
        icon: 'info',
      });
    } else {
      this.cartService.addtoCart(this.itemCarrinho);
      alert('add');
      this.LigaAcordion = false;
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
