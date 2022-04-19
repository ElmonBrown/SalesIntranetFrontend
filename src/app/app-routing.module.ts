import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthModule } from './account/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { DeliveryScheduleModule } from './modules/delivery-schedule/delivery-schedule.module';


const routes: Routes = [
  { path: 'delivery', loadChildren: () => import('./modules/delivery-schedule/delivery-schedule.module').then(m => m.DeliveryScheduleModule) },
  { path: '**', redirectTo: '/delivery' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, 
      { preloadingStrategy: PreloadAllModules, useHash: true }
    ), 
    AuthModule, 
    ClientModule, 
    DeliveryScheduleModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
