import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { PreloadModulesStrategy } from './core/strategies/preload-module.strategy';
import { AuthModule } from './account/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { ProductsModule } from './modules/products/products.module';
import { DeliveryScheduleModule } from './modules/delivery-schedule/delivery-schedule.module';




const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./account/auth/auth.module').then(m => m.AuthModule) },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'delivery', loadChildren: () => import('./modules/delivery-schedule/delivery-schedule.module').then(m => m.DeliveryScheduleModule) },
  { path: 'client', loadChildren: './modules/client/client.module#ClientModule' },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, 
      { preloadingStrategy: PreloadAllModules, useHash: true }
    ), 
    AuthModule, 
    ClientModule, 
    ProductsModule,
    DeliveryScheduleModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
