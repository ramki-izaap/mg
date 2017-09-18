import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from "@angular/http";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


import { routing } from './schedules.routing';
import { Schedules } from './schedules.component';
import { List } from './components/list/list.component';
//import { SmartTablesService } from './components/smartTables/smartTables.service';
import {MembershipsService} from "../../shared/services/memberships.service";

import { addSchedules } from './components/addSchedules'; 
import {UsersService} from "../../shared/services/users.service";
import {SchedulesService} from "../../shared/services/schedules.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    HttpModule,
    NgbRatingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule

  ],
  declarations: [
    Schedules,
    List,
    addSchedules
  ],
  providers: [
    MembershipsService,
    UsersService,
    SchedulesService
  ]
})
export class SchedulesModule {
}
