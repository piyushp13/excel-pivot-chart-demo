import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'landing',
    loadChildren: './landing/landing.module#LandingModule',
    canActivate: [AuthenticationService]
  },
  {
    path: 'view',
    loadChildren: './view/view.module#ViewModule',
    canActivate: [AuthenticationService]
  },
  {
    path: 'report',
    loadChildren: './report/report.module#ReportModule',
    canActivate: [AuthenticationService]
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
