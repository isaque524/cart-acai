import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SaboresService } from 'src/app/services/sabores.service';
import { AcaiSorveteService } from 'src/app/services/tipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {

  public conjunto: any ;
  resultados: any =[];
  public clic: boolean = false;
   ItemT: any =[];
   ItemS: any =[];
  public tiposList: any;
  public SaborList : any ;
  public filterCategory : any;
   carrinho: any [] =[];

  constructor(private tipo: AcaiSorveteService,  private sabor: SaboresService,  private cart: CartService   ) { }

  ngOnInit(): void {
    this.tipo.getAcaiSorveteTodosTipos()
    .subscribe(res =>{
      this.tiposList = res.resultados;
      this.tiposList.forEach((a:any)=>{
        Object.assign(a,{quantidade:1, total:a.preco})
      })

    })
  }

  addComplementos(itemT:any){
  this.clic = true
  this.ItemT = itemT
  this.addSorvete()
  }


  addSorvete(){
    this.sabor.getSabores().subscribe(res =>{
      this.SaborList = res.resultados;
      this.SaborList.forEach((b:any)=>{
        delete Object.assign(b, {['tipoS']: b['tipo'] })['tipo'];
      })
    })
  }

  loppCart(item:any){
    let newItem = item
    this.ItemS.push(newItem);
    this.addComplementos(this.ItemT)


  }

  addtocart(item:any){
    this.clic = false;
    let conItem = item
    /* this.carrinho.push(this.ItemT,this.ItemS) */
   /*  for(let i = 0; i<contador; i++){

    }  */
  if( conItem == item){
    this.ItemT.qtd_adicionais --;
    if(this.ItemT.qtd_adicionais !=0 ){
          this.loppCart(item)
         }else{
          this.ItemS.push(conItem)
            this.carrinho.push(this.ItemT,this.ItemS)  
            /* this.carrinho = {...this.ItemT,...this.ItemS}   */
           /*  this.carrinho = this.ItemS.concat(this.ItemT)  */
           this.cart.addtoCart(this.carrinho);
          /* localStorage.setItem('BD',JSON.stringify(this.carrinho)) */
         }
    }
    /* this.carrinho = {...this.ItemS, ...this.ItemT} */
  }

}
