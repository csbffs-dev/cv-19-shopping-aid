import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule) },
  { path: 'item', loadChildren: () => import('./pages/item/item.module').then( m => m.ItemPageModule) },
  { path: 'store',loadChildren: () => import('./pages/store/store.module').then( m => m.StorePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
