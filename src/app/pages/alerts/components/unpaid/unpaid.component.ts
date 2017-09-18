import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { SmartTablesService } from './smartTables.service';
import {MembershipsService} from "../../../../shared/services/memberships.service";
import { LocalDataSource } from 'ng2-smart-table';
import {SchedulesService} from "../../../../shared/services/schedules.service";
import {PaymentsService} from "../../../../shared/services/payments.service";

@Component({
  selector: 'list-unpaid',
  templateUrl: './unpaid.html',
  styleUrls: ['./list.scss']
})
export class Unpaid {

  query: string = '';

  settings = {
    mode:'external',
    actions:{position: 'right'},
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      user_name: {
        title: 'Name',
        type: 'string'
      },
      membership_name: {
        title: 'Membership Name',
        type: 'string'
      },
      membership_amount: {
        title: 'Amount',
        type: 'string'
      },
      paid_amount: {
        title: 'Paid Amount',
        type: 'string'
      },
      balance_amount: {
        title: 'Balance Amount',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
              protected mservice: MembershipsService, 
              protected shservice: SchedulesService,
              protected pservice: PaymentsService,
              private router: Router) 
  {
    

  }

  loadData()
  {
      this.pservice.unpaid().map(res => res.json()).subscribe(res =>{
          console.log(res);
          this.source.load(res);
      });
  }

  ngOnInit() 
  {
      this.loadData();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) 
    {
      this.mservice.delete(event.data.id).map(res => res.json()).subscribe(res =>{
          this.loadData();//this.router.navigate(['/pages/memberships/smarttables'], { queryParams: {}});
      });
    } else {
      //event.confirm.reject();
    }
  }

  onEdit(event): void
  {
      this.router.navigate(['/pages/payments/add', event.data.id], { queryParams: {}});
  }
}
