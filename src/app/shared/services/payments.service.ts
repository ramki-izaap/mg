import { Injectable } from '@angular/core';
import {AppSettings} from '../appSettings';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class PaymentsService {

  constructor(private http:Http) { }

  list():Observable<Response>{
    
    let body = new FormData();
    
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'payment/list', options )
  } 

  get( id ):Observable<Response>{
    
    let body = new FormData();

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'payment/get/'+id, options )
  } 

  getPaidAmount( user_id, mh_id ):Observable<Response>{
    
    let body = new FormData();

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'membership/paid_amount/'+user_id+'/'+mh_id, options )
  }

  addPayment(data):Observable<Response>{   
    
    
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post( AppSettings.API_ENDPOINT+'membership/add_payment', data, options )
  }

}
