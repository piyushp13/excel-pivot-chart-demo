import { CanActivate, Router } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
