import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import {MembershipsService} from "../../../../shared/services/memberships.service";
import {ExpenseService} from "../../../../shared/services/expense.service";
import { LocalDataSource } from 'ng2-smart-table';

import {ButtonViewComponent} from "./buttonView.component"; 

@Component({
  selector: 'expense-list',
  templateUrl: './expenseList.html',
  styleUrls: ['./expenseList.scss']
  
})
export class ExpenseList implements OnInit{

  query: string = '';

  settings:any = {};

  source: LocalDataSource = new LocalDataSource();

  constructor(protected mservice: MembershipsService, protected exservice: ExpenseService, private router: Router) {
    
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });

    this.settings = {
    actions:false,
    // //mode:'external',
    // actions:{
    //   //position: 'right'
    // },
    // add: {
    //   addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    //   createButtonContent: '<i class="ion-checkmark"></i>',
    //   cancelButtonContent: '<i class="ion-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="ion-edit"></i>',
    //   saveButtonContent: '<i class="ion-checkmark"></i>',
    //   cancelButtonContent: '<i class="ion-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="ion-trash-a"></i>',
    //   confirmDelete: true
    // },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      amount: {
        title: 'Amount',
        type: 'string'
      },
      paid_date: {
        title: 'Paid Date',
        type: 'string'
      },     
      created_date: {
        title: 'Created On',
        type: 'string'
      },
      id: {
        title: 'Actions',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          
          instance.view.subscribe(row => {
            alert('view!')
          });

          instance.edit.subscribe(row => {
            
          });

          instance.delete.subscribe(row => {
            alert('delete!')
          });
        }
      }
    }
  };

  }

  ngOnInit() 
  {
      this.exservice.list().map(res => res.json()).subscribe(res =>{
          console.log(res);
          this.source.load(res);
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) 
    {
      this.exservice.delete(event.data.id).map(res => res.json()).subscribe(res =>{
          this.router.navigate(['/pages/expense/expense-list'], { queryParams: {}});
      });
    } else {
      //event.confirm.reject();
    }
  }

  onEdit(event): void
  {
      this.router.navigate(['/pages/expense/inputs', event.data.id], { queryParams: {}});
  }
}
