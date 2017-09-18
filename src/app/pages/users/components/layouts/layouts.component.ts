import {Component} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";

@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
})
export class Layouts {

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public udata:any;
  
  constructor( protected mservice: MembershipsService, 
                protected uservice: UsersService,
                private activatedRoute: ActivatedRoute ) 
  {
    this.udata = {};
  }

  ngOnInit() 
  {
      this.activatedRoute.params.subscribe((params: Params) => {
          console.log(params);
          if( typeof params['id'] != 'undefined' && params['id'] != '' )
          {
            this.uservice.get(params['id']).map(res => res.json()).subscribe(res =>{
              console.log(res);    
              this.udata = res;  
              this.udata.name = 'Radajhhd sdsadhasd sjadhkjsahdjsahd';    
            });
          }
      });
  }
}
