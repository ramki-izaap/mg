import { Routes, RouterModule } from '@angular/router';

import { Alerts } from './alerts.component';
import { Unpaid } from './components/unpaid/unpaid.component';
import { Ending } from './components/ending/ending.component';
import { Add } from './components/add/add.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Alerts,
    children: [
      { path: 'unpaid', component: Unpaid },
      { path: 'ending', component: Ending },
      { path: 'add', component: Add }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
