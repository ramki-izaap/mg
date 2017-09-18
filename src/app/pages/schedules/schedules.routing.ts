import { Routes, RouterModule } from '@angular/router';

import { Schedules } from './schedules.component';
import { List } from './components/list/list.component';
import { addSchedules } from './components/addSchedules/addSchedules.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Schedules,
    children: [
      { path: 'list', component: List },
      { path: 'add', component: addSchedules },
      { path: 'add/:id', component: addSchedules }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
