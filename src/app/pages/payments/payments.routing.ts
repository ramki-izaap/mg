import { Routes, RouterModule } from '@angular/router';

import { Payments } from './payments.component';
import { List } from './components/list/list.component';
import { Add } from './components/add/add.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Payments,
    children: [
      { path: 'list', component: List },
      { path: 'add', component: Add },
      { path: 'add/:id', component: Add }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
