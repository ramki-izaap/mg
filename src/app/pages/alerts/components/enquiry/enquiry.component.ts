import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { SmartTablesService } from './smartTables.service';
import {MembershipsService} from "../../../../shared/services/memberships.service";
import { LocalDataSource } from 'ng2-smart-table';
import {SchedulesService} from "../../../../shared/services/schedules.service";
import {PaymentsService} from "../../../../shared/services/payments.service";
import {UsersService} from "../../../../shared/services/users.service";

@Component({
  selector: 'list-enquiry',
  templateUrl: './enquiry.html',
  styleUrls: ['./list.scss']
})
export class Enquiry {

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
      editButtonContent: '<i class="ion-eye"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '',
      confirmDelete: false
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      mobile_no: {
        title: 'Mobile No',
        type: 'string'
      },
      membership_name: {
        title: 'Membership',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
              protected mservice: MembershipsService, 
              protected shservice: SchedulesService,
              protected pservice: PaymentsService,
              protected uservice: UsersService,
              private router: Router) 
  {
    

  }

  loadData()
  {
      this.uservice.getLeadFollowups().map(res => res.json()).subscribe(res =>{
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
      this.router.navigate(['/pages/leads/layouts', event.data.id], { queryParams: {}});
  }
}
