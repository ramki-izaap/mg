import { Routes, RouterModule }  from '@angular/router';

import { Users } from './users.component'; 
import { Inputs } from './components/inputs/inputs.component';
import { UsersList } from './components/usersList/usersList.component';
import { Layouts } from './components/layouts/layouts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      { path: 'inputs', component: Inputs },
      { path: 'users-list', component: UsersList },
      { path: 'layouts', component: Layouts }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
