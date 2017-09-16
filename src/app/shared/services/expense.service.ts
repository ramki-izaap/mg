import { Injectable } from '@angular/core';
import {AppSettings} from '../appSettings';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ExpenseService {

  constructor(private http:Http) { }

  list():Observable<Response>{
    
    let body = new FormData();
    
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'expense/list', options )
  }

  add(data):Observable<Response>{ 
        
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post( AppSettings.API_ENDPOINT+'expense/add', data, options )
  }

  get( id ):Observable<Response>{
    
    let body = new FormData();

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'expense/get/'+id, options )
  }

  delete( id ):Observable<Response>{
    
    let body = new FormData();
    	body.append('id', id);

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post( AppSettings.API_ENDPOINT+'expense/delete', body, options )
  }


}

