import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostMachineGuard implements CanActivate {
  router: Router

  constructor(router: Router){
    this.router = router
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(localStorage.getItem("roles")?.includes("CAN_CREATE_MACHINES"))
      return true
    else {
      alert("You are not authorized to create machines.")
      this.router.navigate(['/get_machines'])
      return false
    } 
  }
  
}
