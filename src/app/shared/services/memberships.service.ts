import { Injectable } from '@angular/core';
import {AppSettings} from '../appSettings';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class MembershipsService {

  constructor(private http:Http) { }

  list():Observable<Response>{
    
    let body = new FormData();
    
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'membership/list', options )
  }

  add(data):Observable<Response>{
    
    
    
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post( AppSettings.API_ENDPOINT+'membership/add', data, options )
  }

  get( id ):Observable<Response>{
    
    let body = new FormData();

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'membership/get/'+id, options )
  }

  delete( id ):Observable<Response>{
    
    let body = new FormData();
    	body.append('id', id);

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post( AppSettings.API_ENDPOINT+'membership/delete', body, options )
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
