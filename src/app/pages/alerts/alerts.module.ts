import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from "@angular/http";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


import { routing } from './alerts.routing';
import { Alerts } from './alerts.component';
import { Add } from './components/add';
import { Unpaid } from './components/unpaid';
import { Ending } from './components/ending'; 


import {MembershipsService} from "../../shared/services/memberships.service";
import {UsersService} from "../../shared/services/users.service";
import {SchedulesService} from "../../shared/services/schedules.service";
import {PaymentsService} from "../../shared/services/payments.service";

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
    Alerts,
    Add,
    Unpaid,
    Ending
  ],
  providers: [
    MembershipsService,
    UsersService,
    SchedulesService,
    PaymentsService
  ]
})
export class AlertsModule {
}
