import { Routes, RouterModule }  from '@angular/router';

import { Leads } from './leads.component'; 
import { Inputs } from './components/inputs/inputs.component';
import { UsersList } from './components/usersList/usersList.component';
import { Layouts } from './components/layouts/layouts.component';
import { ScheduleView } from './components/scheduleView/scheduleView.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Leads,
    children: [
      { path: 'inputs', component: Inputs },
      { path: 'inputs/:id', component: Inputs },
      { path: 'users-list', component: UsersList },
      { path: 'layouts', component: Layouts },
      { path: 'layouts/:id', component: Layouts },
      { path: 'schedule/:id', component: ScheduleView }  
    ]
  }
];

export const routing = RouterModule.forChild(routes);
