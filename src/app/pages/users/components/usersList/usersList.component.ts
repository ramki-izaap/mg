import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'users-list',
  templateUrl: './usersList.html',
  styleUrls: ['./usersList.scss']
})
export class UsersList {

  query: string = '';

  settings = {
    mode:'external',
    actions:{
      //position: 'right'
    },
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
      },
      end_date: {
        title: 'Expired On',
        type: 'string'
      },
      Actions: //or something
      {
        title:'Actions',
        type:'html',
        valuePrepareFunction:(cell,row)=>{
          return `<a class="ng2-smart-action" href="Your api key or something/${row.id}"> 
                    <i class="ion-eye"></i>
                   </a>
                   <a class="ng2-smart-action" href="/#/pages/users/inputs/${row.id}"> 
                    <i class="ion-edit"></i>
                   </a>
                   <a class="ng2-smart-action" href="Your api key or something/${row.id}"> 
                    <i class="ion-trash-a"></i>
                   </a>`
        },
        filter:false       
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected mservice: MembershipsService, protected uservice: UsersService, private router: Router) {
    
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });

    this.uservice.list().map(res => res.json()).subscribe(res =>{
        console.log(res);
        this.source.load(res);
    });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) 
    {
      this.uservice.delete(event.data.id).map(res => res.json()).subscribe(res =>{
          this.router.navigate(['/pages/users/users-list'], { queryParams: {}});
      });
    } else {
      //event.confirm.reject();
    }
  }

  onEdit(event): void
  {
      this.router.navigate(['/pages/users/inputs', event.data.id], { queryParams: {}});
  }
}
