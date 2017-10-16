import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";
import {SchedulesService} from "../../../../shared/services/schedules.service";

import { DefaultModal } from './default-modal/default-modal.component';
import {ScheduleActionComponent} from "./scheduleAction.component"; 

@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
  styleUrls: ['./list.scss']
})
export class Layouts implements OnInit{

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
                protected shservice: SchedulesService,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private router: Router ) 
  {

    var self = this;

    this.udata = {};
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
      this.uservice.getLead(id).map(res => res.json()).subscribe(res =>{
        console.log(res);    
        this.udata = res;  
        
      });
  }

  

}
