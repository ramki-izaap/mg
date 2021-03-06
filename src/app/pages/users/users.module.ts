import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }       from './users.routing';

import { Users } from './users.component';
import { Inputs } from './components/inputs';
import { UsersList } from './components/usersList';
import { Layouts } from './components/layouts';
import { ScheduleView } from './components/scheduleView/scheduleView.component';

import { ButtonViewComponent } from './components/usersList/buttonView.component';
import { ScheduleActionComponent } from './components/layouts/scheduleAction.component';
import { DefaultModal } from './components/layouts/default-modal/default-modal.component';


import { InlineForm } from './components/layouts/components/inlineForm';
import { BlockForm } from './components/layouts/components/blockForm';
import { HorizontalForm } from './components/layouts/components/horizontalForm';
import { BasicForm } from './components/layouts/components/basicForm';
import { WithoutLabelsForm } from './components/layouts/components/withoutLabelsForm';


import {MembershipsService} from "../../shared/services/memberships.service";
import {UsersService} from "../../shared/services/users.service";
import {SchedulesService} from "../../shared/services/schedules.service";
import {PaymentsService} from "../../shared/services/payments.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    NgbRatingModule,
    NgbDatepickerModule,
    NgbModalModule,
    routing
  ],
  declarations: [
    Layouts,
    Inputs,
    UsersList,
    Users,
    ButtonViewComponent,
    InlineForm,
    BlockForm,
    HorizontalForm,
    BasicForm,
    WithoutLabelsForm,
    ScheduleView,
    ScheduleActionComponent,
    DefaultModal
  ],
  providers: [
    MembershipsService,
    UsersService,
    SchedulesService,
    PaymentsService
  ],
  entryComponents: [
      ButtonViewComponent,
      ScheduleActionComponent, 
      DefaultModal]
})
export class UsersModule {
}
