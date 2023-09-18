import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserInfo } from '../model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit, OnDestroy {

  userList: Array<UserInfo>
  canUpdate: boolean = false
  router: Router
  someSubscription: any

  constructor(private userService: UserService, router: Router) {
    this.userList = new Array<UserInfo>
    if(localStorage.getItem("roles")?.includes("CAN_UPDATE_USERS"))
      this.canUpdate = true
    this.router = router

    //https://medium.com/beingcoders/angular-basics-refresh-an-angular-component-without-reloading-the-same-component-b6c513f06fb2
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.someSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
   }

  ngOnInit(): void {
    this.userService.readUsers().subscribe(result => {
      this.userList = result
    })
  }

  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  getPermission(permission: string): boolean {
    if(localStorage.getItem("roles")?.includes(permission)) 
      return true
    else
      return false
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(result => {
      this.router.navigate(['/get_users'])
    })
    this.userService.readUsers().subscribe(result => {
      this.userList = result
    })
  }

  logOut(): void {
    localStorage.setItem("token", '')
    localStorage.setItem("roles", '')
    localStorage.setItem("email", '')
  }
}
