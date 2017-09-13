import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }       from './users.routing';

import { Users } from './users.component';
import { Inputs } from './components/inputs';
import { UsersList } from './components/usersList';
import { Layouts } from './components/layouts';

import { ButtonViewComponent } from './components/usersList/buttonView.component';

import { StandardInputs } from './components/inputs/components/standardInputs';
import { ValidationInputs } from './components/inputs/components/validationInputs';
import { CheckboxInputs } from './components/inputs/components/checkboxInputs';


import { InlineForm } from './components/layouts/components/inlineForm';
import { BlockForm } from './components/layouts/components/blockForm';
import { HorizontalForm } from './components/layouts/components/horizontalForm';
import { BasicForm } from './components/layouts/components/basicForm';
import { WithoutLabelsForm } from './components/layouts/components/withoutLabelsForm';

import {MembershipsService} from "../../shared/services/memberships.service";
import {UsersService} from "../../shared/services/users.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    NgbRatingModule,
    NgbDatepickerModule,
    routing
  ],
  declarations: [
    Layouts,
    Inputs,
    UsersList,
    Users,
    ButtonViewComponent,
    StandardInputs,
    ValidationInputs,
    CheckboxInputs,
    InlineForm,
    BlockForm,
    HorizontalForm,
    BasicForm,
    WithoutLabelsForm
  ],
  providers: [
    MembershipsService,
    UsersService
  ],
  entryComponents: [ButtonViewComponent]
})
export class UsersModule {
}
