import { Injectable } from '@angular/core';
import { adicional } from '../model/adicional';

@Injectable({
  providedIn: 'root',
})
export class AdicionaisService {
  constructor() {}

  getAll(): adicional[] {
    return [
      {
        imagem: 'assets/acai-e-sorvete-1583790894836_v2_450x337.jpg',
        nome: 'Paçoca',
      },
      { imagem: 'assets/icone-de-sorvete_340607-63 (1).png', nome: 'Amendoin' },
      { imagem: 'assets/banana-split.jpg', nome: 'Leite em Pó' },
      { imagem: 'assets/Barca.jpg', nome: 'Sucrilhos' },
      {
        imagem: 'assets/hot-fudge-sundae-gold-brick-1-Rev1.webp',
        nome: 'Chocoboll',
      },
      { imagem: 'assets/MilkShake.jpg', nome: 'Aveia' },
      { imagem: 'assets/MilkShake.jpg', nome: 'Granola' },
    ];
  }
}
