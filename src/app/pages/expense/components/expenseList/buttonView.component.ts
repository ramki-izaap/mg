import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ExpenseService} from "../../../../shared/services/expense.service";

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  template:`  
      <a class="ng2-smart-action" (click)="onClick('view')"> 
        <i class="ion-eye"></i>
      </a>
      &nbsp;&nbsp;
      <a class="ng2-smart-action" (click)="onClick('edit')"> 
        <i class="ion-edit"></i>
      </a>
      &nbsp;&nbsp;
      <a class="ng2-smart-action" (click)="onClick('delete')"> 
        <i class="ion-trash-a"></i>
      </a>`
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData:any;

  @Output() view: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(protected exservice: ExpenseService, private router: Router) 
   {

   }

  ngOnInit() {
    console.log('HHHHHHHH', this.value);
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick( atype:string ) 
  {
    if( atype == 'view' )
    {
      //this.view.emit(this.rowData);
    }
    else if( atype == 'edit' )
    {
      //console.log('JJJJJJJJJJJJJ', this.rowData);
      this.router.navigate(['/pages/expense/inputs', this.rowData.id], { queryParams: {}});
      //this.edit.emit(this.rowData);
    }
    else if( atype == 'delete' )
    {
      //this.delete.emit(this.rowData);

      if (window.confirm('Are you sure you want to delete?')) 
      {
        this.exservice.delete(this.rowData.id).map(res => res.json()).subscribe(res =>{
            this.router.navigate(['/pages/expense/expense-list'], { queryParams: {}});
        });
      } else {
        //event.confirm.reject();
      }
    }
    
    
  }
}