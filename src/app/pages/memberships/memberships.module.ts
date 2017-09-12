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
import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';
import {MembershipsService} from "../../shared/services/memberships.service";

import { StandardInputs } from './components/standardInputs';

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
    SmartTables,
    StandardInputs
  ],
  providers: [
    SmartTablesService,
    MembershipsService
  ]
})
export class MembershipsModule {
}
