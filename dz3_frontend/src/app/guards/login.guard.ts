import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanDeactivate<LoginComponent> {
  router: Router

  constructor(router: Router){
    this.router = router
  };

  canDeactivate(
    component: LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("roles")?.includes("CAN_READ_USERS") ||
       localStorage.getItem("roles")?.includes("CAN_SEARCH_MACHINES"))
      return true
    else {
      alert("You have no permissions.")
      this.router.navigate(['/'])
      return false
    } 
  }
}
