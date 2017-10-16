import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UsersService} from "../../../../shared/services/users.service";

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  template: `
    
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
      </a>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() view: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(protected uservice: UsersService, private router: Router) 
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
      this.router.navigate(['/pages/leads/layouts', this.rowData.id], { queryParams: {}});
    }
    else if( atype == 'edit' )
    {
      //console.log('JJJJJJJJJJJJJ', this.rowData);
      this.router.navigate(['/pages/leads/inputs', this.rowData.id], { queryParams: {}});
      //this.edit.emit(this.rowData);
    }
    else if( atype == 'delete' )
    {
      //this.delete.emit(this.rowData);

      if (window.confirm('Are you sure you want to delete?')) 
      {
        this.uservice.deleteLead({id:this.rowData.id}).map(res => res.json()).subscribe(res =>{
            this.delete.emit(this.rowData);
        });
      } else {
        //event.confirm.reject();
      }
    }
    
    
  }
}