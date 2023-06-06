
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, take } from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from '../environments/enviroment';
import { RootObject, Resultado, RequestCreate } from '../model/tipos';


@Injectable({
  providedIn: 'root'
})
export class AcaiSorveteService {

  constructor(private http: HttpClient) { }
  httpOptions = {

    headers: new HttpHeaders({
      'content-type': 'application/json',
      'apiKey':`${environment.apiKey}`
    }),


}


//Açaí e Sorvete//

public getAcaiSorveteTodosTipos():Observable<RootObject>{
  return this.http.get<RootObject>(`${environment.apiUrl}/compartimentos/`,
  {headers: this.httpOptions.headers})

};

 public getAcaiSorveteCopo():Observable<RootObject>{
  return this.http.get<RootObject>(`${environment.apiUrl}/compartimentos/?tipo=copo`,
  {headers: this.httpOptions.headers});
};

public getAcaiSorveteBananaSplit():Observable<RootObject>{
  return this.http.get<RootObject>(`${environment.apiUrl}/compartimentos/?tipo=banana_split`,
  {headers: this.httpOptions.headers});
};

public getAcaiSorveteSundae():Observable<RootObject>{
  return this.http.get<RootObject>(`${environment.apiUrl}/compartimentos/?tipo=taça`,
  {headers: this.httpOptions.headers});
}

public getAcaiSorveteBarca():Observable<RootObject>{
  return this.http.get<RootObject>(`${environment.apiUrl}/compartimentos/?tipo=barca`,
  {headers: this.httpOptions.headers});
}

public getAcaiSorveteMilkShake():Observable<RootObject>{
  return this.http.get<RootObject>(`${environment.apiUrl}/compartimentos/?tipo=milk_shake`,
  {headers: this.httpOptions.headers});
}

public pesquisarPorId(id: string): Observable<Resultado>{
  const _url = `${environment.apiUrl}/compartimentos/${id}`
  return this.http.get<Resultado>(_url,{headers: this.httpOptions.headers})
}

public atualizar(id: string, request:RequestCreate):Observable<RootObject>{
  const _url = `${environment.apiUrl}/compartimentos/${id}`
  return this.http.put<RootObject>(_url,request,{headers: this.httpOptions.headers});
}

public deletar(id: string): Observable<RootObject>{
  const _url = `${environment.apiUrl}/compartimentos/${id}`
  return this.http.delete<RootObject>(_url,{headers: this.httpOptions.headers})
}


public postAcaiSorvete(request:RequestCreate){
  console.log(request);
    return this.http.post<Resultado>(`${environment.apiUrl}/compartimentos`,request,{headers: this.httpOptions.headers});
}


}
