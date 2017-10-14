import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";
import {SchedulesService} from "../../../../shared/services/schedules.service";


@Component({
  selector: 'layouts',
  templateUrl: './scheduleView.html'
})
export class ScheduleView implements OnInit{

  public data:any;
  
  constructor( protected mservice: MembershipsService, 
                protected uservice: UsersService,
                protected shservice: SchedulesService,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private router: Router ) 
  {
    this.data = {};
  }

  ngOnInit() 
  {
    this.activatedRoute.params.subscribe((params: Params) => {
          
        if( typeof params['id'] != 'undefined' && params['id'] != '' )
        {
            this.shservice.get( params['id'] ).map(res => res.json()).subscribe(res =>{
                console.log(res);
                this.data = res;
            });
        }
    });

    
  }

}
