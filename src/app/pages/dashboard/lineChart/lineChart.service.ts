import {Injectable} from '@angular/core';
import {AppSettings} from '../../../shared/appSettings';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
@Injectable()
export class LineChartService {

  constructor(private http:Http) {

  }

  getData() {

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get( AppSettings.API_ENDPOINT+'dashboard/linechart', options).map((res:Response) => res.json());

    
  }

  
}