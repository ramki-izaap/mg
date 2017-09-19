import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {PaymentsService} from "../../../../../shared/services/payments.service";

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalContent: string = '';

  public amount:any;
  public user_id:any;
  public mh_id:any;
  public obj:any;

  constructor( protected pservice: PaymentsService, 
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
                      amount:this.amount,
                      user_id:this.user_id,
                      mh_id:this.mh_id
                    };

    
    this.pservice.addPayment(data).map(res => res.json()).subscribe(res =>{
        
        this.obj.loadData(this.user_id);

        this.activeModal.close();
    });
  }
}
