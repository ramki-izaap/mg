import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from "@angular/http";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './memberships.routing';
import { Memberships } from './memberships.component';
import { List } from './components/list/list.component';
//import { SmartTablesService } from './components/smartTables/smartTables.service';
import {MembershipsService} from "../../shared/services/memberships.service";

import { AddMembership } from './components/addMembership';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    HttpModule,
    NgbRatingModule,
    NgbDatepickerModule

  ],
  declarations: [
    Memberships,
    List,
    AddMembership
  ],
  providers: [
    MembershipsService
  ]
})
export class MembershipsModule {
}
