import { Component, OnInit } from '@angular/core';
import { SaboresService } from 'src/app/services/sabores.service';

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styleUrls: ['./sabores.component.css']
})
export class SaboresComponent implements OnInit {
  resultados: any =[]
    public SaborList : any ;

  constructor(  private sabor: SaboresService,) { }

  ngOnInit(): void {

    this.sabor.getSabores()
    .subscribe(res =>{
      this.SaborList = res.resultados;
      this.SaborList.forEach((a:any)=>{
        Object.assign(a,{quantidade:1, total:a.preco})
      })

    })

  }

}
