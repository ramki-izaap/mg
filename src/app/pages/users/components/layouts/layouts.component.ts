import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";

import { DefaultModal } from './default-modal/default-modal.component';

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
  public payment_info:any;
  public make_payment_flag:boolean;
  
  constructor( protected mservice: MembershipsService, 
                protected uservice: UsersService,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal ) 
  {
    this.udata = {};
    this.payment_info = {};
    this.make_payment_flag = false;

  }

  ngOnInit() 
  {
      this.activatedRoute.params.subscribe((params: Params) => {
          
          if( typeof params['id'] != 'undefined' && params['id'] != '' )
          {
              this.loadData(params['id']);
          }
      });
  }

  loadData( id:number )
  {
      this.uservice.get(id).map(res => res.json()).subscribe(res =>{
        console.log(res);    
        this.udata = res;  
        this.payment_info = res.payment_info; 
        if( parseFloat(this.payment_info.balance_amount) > 0 )
        {
          this.make_payment_flag = true;
        } 
      });
  }

  makePayment()
  {
    const activeModal = this.modalService.open(DefaultModal, {size: 'lg'});
    
    activeModal.componentInstance.modalHeader = 'Pay Now';
    activeModal.componentInstance.user_id = this.udata.id;
    activeModal.componentInstance.mh_id = this.payment_info.mh_id;
    activeModal.componentInstance.obj = this;
    
  }
}
