import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  template: `
    
      <a class="ng2-smart-action" (click)="onClick('view')"> 
        <i class="ion-eye"></i>
      </a>

      <a class="ng2-smart-action" (click)="onClick('edit')"> 
        <i class="ion-edit"></i>
      </a>

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

  ngOnInit() {
    console.log('HHHHHHHH', this.value);
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick( atype:string ) 
  {
    if( atype == 'view' )
    {
      console.log('IIIIIIIIIII', this.rowData);
      this.view.emit(this.rowData);
    }
    else if( atype == 'edit' )
    {
      console.log('JJJJJJJJJJJJJ', this.rowData);
      this.edit.emit(this.rowData);
    }
    else if( atype == 'delete' )
    {
      this.delete.emit(this.rowData);
    }
    
    
  }
}