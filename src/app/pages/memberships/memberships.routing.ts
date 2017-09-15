import { Routes, RouterModule } from '@angular/router';

import { Memberships } from './memberships.component';
import { List } from './components/list/list.component';
import { AddMembership } from './components/addMembership/addMembership.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Memberships,
    children: [
      { path: 'list', component: List },
      { path: 'add', component: AddMembership },
      { path: 'add/:id', component: AddMembership }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
