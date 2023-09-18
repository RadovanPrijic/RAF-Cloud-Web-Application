import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUsersGuard implements CanActivate {
  router: Router

  constructor(router: Router){
    this.router = router
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("roles")?.includes("CAN_READ_USERS"))
      return true
    else {
      alert("You are not authorized to read users.")
      this.router.navigate(['/home'])
      return false
    } 
  }
}
