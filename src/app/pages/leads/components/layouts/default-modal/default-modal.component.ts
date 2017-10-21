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
  public next_followup_date:any;
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
                      next_followup_date:this.next_followup_date,
                      lead_id:this.obj.id
                    };

    
    this.uservice.addFollowup(data).map(res => res.json()).subscribe(res =>{
        
        //this.obj.loadData(this.user_id);

        this.activeModal.close();
    });
  }
}
