import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {UsersService} from "../../../../../shared/services/users.service";

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalContent: string = '';

  public comments:any;
  public next_followup_date:any = {};
  public obj:any;

  constructor( protected uservice: UsersService, 
                private activeModal: NgbActiveModal,
                private router: Router) 
  {

  }

  ngOnInit() {}

  closeModal() {

    this.activeModal.close();
  }

  pay()
  {
    let data:any = {
                      comments:this.comments,
                      next_followup_date: this.dateObjToStr( this.next_followup_date ),
                      lead_id:this.obj.udata.id
                    };

    
    this.uservice.addFollowup(data).map(res => res.json()).subscribe(res =>{
        
        this.obj.loadData(this.obj.udata.id);

        this.activeModal.close();
    });
  }

  dateObjToStr( obj )
  {
    let str = '';

    if( typeof obj == 'object' && typeof obj['month'] != 'undefined' )
    {
      obj.month = (obj.month<10) ? ('0'+ obj.month) : obj.month;
      obj.day = (obj.day<10) ? ('0'+ obj.day) : obj.day;
      str = obj.year +'-'+ obj.month +'-'+ obj.day;
    }
    

    return str;
  }
}
