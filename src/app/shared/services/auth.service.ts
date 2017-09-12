import {Injectable, Inject} from "@angular/core";
import {AppSettings} from '../appSettings';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

interface auth{
  email:string,
  password:string
}

@Injectable()
export class AuthService {

  constructor(private http:Http){
    console.log(AppSettings.API_ENDPOINT);
  }

  signup(formData):Observable<Response>{
    
    let body = new FormData();
      body.append('email', formData.email);
      body.append('password', formData.password);
    
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(
      AppSettings.API_ENDPOINT+'user/login',
      body,
      options
      )
  }
}