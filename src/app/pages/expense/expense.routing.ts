import { Routes, RouterModule }  from '@angular/router';

import { Expense } from './expense.component'; 
import { Inputs } from './components/inputs/inputs.component';
import { ExpenseList } from './components/expenseList/expenseList.component';
import { Layouts } from './components/layouts/layouts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Expense,
    children: [
      { path: 'inputs', component: Inputs },
      { path: 'expense-list', component: ExpenseList },
      { path: 'inputs/:id', component: Inputs }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
