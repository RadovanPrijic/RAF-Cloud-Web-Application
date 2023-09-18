import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getPermission(permission: string): boolean {
    if(localStorage.getItem("roles")?.includes(permission)) 
      return true
    else
      return false
  }
}
