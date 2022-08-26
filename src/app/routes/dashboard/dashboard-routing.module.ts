import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACLGuard } from '@delon/acl';

import { DashboardAnalysisComponent } from './analysis/analysis.component';
import { DashboardMonitorComponent } from './monitor/monitor.component';
import { DashboardV1Component } from './v1/v1.component';
import { DashboardWorkplaceComponent } from './workplace/workplace.component';

const routes: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  {
    path: 'v1',
    component: DashboardV1Component,
    canActivate: [ACLGuard],
    data: { guard: 'ability.dashboard.v1' }
  },
  {
    path: 'analysis',
    component: DashboardAnalysisComponent,
    canActivate: [ACLGuard],
    data: { guard: 'ability.dashboard.analysis' }
  },
  { path: 'monitor', component: DashboardMonitorComponent, canActivate: [ACLGuard], data: { guard: 'ability.dashboard.monitor' } },
  { path: 'workplace', component: DashboardWorkplaceComponent, canActivate: [ACLGuard], data: { guard: 'ability.dashboard.workplace' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
