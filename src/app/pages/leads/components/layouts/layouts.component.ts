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

  query: string = '';

  settings:any = {};

  source: LocalDataSource = new LocalDataSource();


  public udata:any;
  public payment_info:any;
  public make_payment_flag:boolean;
  
  constructor( protected mservice: MembershipsService, 
                protected uservice: UsersService,
                protected shservice: SchedulesService,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private router: Router ) 
  {

    var self = this;

    this.udata = {};
    this.payment_info = {};
    this.make_payment_flag = false;

    this.settings = {
                        actions:false,
                        columns: {
                          goal: {
                            title: 'Goal',
                            type: 'string'
                          },
                          start_date: {
                            title: 'Start Date',
                            type: 'string'
                          },
                          end_date: {
                            title: 'End Date',
                            type: 'string'
                          },
                          id: {
                              title: 'Actions',
                              type: 'custom',
                              renderComponent: ScheduleActionComponent,
                              onComponentInitFunction(instance) {
                                
                                instance.view.subscribe(row => {
                                  console.log(row);
                                  self.router.navigate(['/pages/users/schedule', row.id], { queryParams: {}});
                                });

                                instance.edit.subscribe(row => {
                                  
                                });

                                instance.delete.subscribe(row => {
                                  
                                  
                                  
                                });
                              }
                            }
                        }
                        
                      };

  }

  ngOnInit() 
  {
      this.activatedRoute.params.subscribe((params: Params) => {
          
          if( typeof params['id'] != 'undefined' && params['id'] != '' )
          {
              this.loadData(params['id']);
          }
      });

      this.shservice.list().map(res => res.json()).subscribe(res =>{
          console.log(res);
          this.source.load(res);
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
