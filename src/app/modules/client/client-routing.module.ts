import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';

const routes: Routes = [
  {
    path: 'pages/blank-page',
    component: BlankPageComponent,
    data: { title: 'BlankPage' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
  static components = [
  ];

}
