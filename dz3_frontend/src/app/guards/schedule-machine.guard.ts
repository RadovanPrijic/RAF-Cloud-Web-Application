import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMachineGuard implements CanActivate {
  router: Router

  constructor(router: Router){
    this.router = router
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("roles")?.includes("CAN_SCHEDULE_MACHINES"))
      return true
    else {
      alert("You are not authorized to schedule machines and read their error history.")
      this.router.navigate(['/get_machines'])
      return false
    } 
  }
  
}
