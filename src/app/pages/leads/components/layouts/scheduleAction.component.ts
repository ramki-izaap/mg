import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UsersService} from "../../../../shared/services/users.service";

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  template: `
      &nbsp;&nbsp;
      <a class="ng2-smart-action" (click)="onClick('view')"> 
        <i class="ion-eye"></i>
      </a>
      
  `,
})
export class ScheduleActionComponent implements ViewCell, OnInit {
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
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick( atype:string ) 
  {
    if( atype == 'view' )
    {
      this.view.emit(this.rowData);
    }
    else if( atype == 'edit' )
    {
      this.edit.emit(this.rowData);
    }
    else if( atype == 'delete' )
    {
      this.delete.emit(this.rowData);
    }
    
    
  }
}