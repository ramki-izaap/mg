import { Routes, RouterModule } from '@angular/router';

import { Memberships } from './memberships.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { StandardInputs } from './components/standardInputs/standardInputs.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Memberships,
    children: [
      { path: 'smarttables', component: SmartTables },
      { path: 'standard-inputs', component: StandardInputs },
      { path: 'standard-inputs/:id', component: StandardInputs }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
