import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { SmartTablesService } from './smartTables.service';
import {MembershipsService} from "../../../../shared/services/memberships.service";
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'list-memberships',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class List {

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
      name: {
        title: 'Name',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      duration: {
        title: 'Duration (days)',
        type: 'string'
      },
      amount: {
        title: 'Amount (Rs)',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected mservice: MembershipsService, private router: Router) 
  {
    

  }

  loadData()
  {
      this.mservice.list().map(res => res.json()).subscribe(res =>{
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
      this.router.navigate(['/pages/memberships/add', event.data.id], { queryParams: {}});
  }
}
