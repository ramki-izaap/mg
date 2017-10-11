import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }       from './expense.routing';

import { Expense } from './expense.component';
import { Inputs } from './components/inputs';
import { ExpenseList } from './components/expenseList';
import { Layouts } from './components/layouts';

import { ButtonViewComponent } from './components/expenseList/buttonView.component';

import { InlineForm } from './components/layouts/components/inlineForm';
import { BlockForm } from './components/layouts/components/blockForm';
import { HorizontalForm } from './components/layouts/components/horizontalForm';
import { BasicForm } from './components/layouts/components/basicForm';
import { WithoutLabelsForm } from './components/layouts/components/withoutLabelsForm';

import {MembershipsService} from "../../shared/services/memberships.service";
import {ExpenseService} from "../../shared/services/expense.service";

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
    routing
  ],
  declarations: [
    Layouts,
    Inputs,
    ExpenseList,
    Expense,
    ButtonViewComponent,
    InlineForm,
    BlockForm,
    HorizontalForm,
    BasicForm,
    WithoutLabelsForm
  ],
  providers: [
    MembershipsService,
    ExpenseService
  ],
  entryComponents: [ButtonViewComponent]
})
export class ExpenseModule {
}
