import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role, UserInfo } from '../model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateForm: FormGroup
  userInfo: UserInfo
  readRole:  boolean = false
  createRole: boolean = false
  updateRole: boolean = false
  deleteRole: boolean = false
  searchMachinesRole: boolean = false
  startMachinesRole: boolean = false
  stopMachinesRole: boolean = false
  restartMachinesRole: boolean = false
  createMachinesRole: boolean = false
  scheduleMachinesRole: boolean = false
  destroyMachinesRole: boolean = false
  roles: Role[]

  constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.updateForm = this.formBuilder.group({
      name_field: ['', [Validators.required]],
      surname_field: ['', [Validators.required]],
      email_field: ['', [Validators.required]]
    })
    this.userInfo = {
      id: 0,
      name: '',
      surname: '',
      email: '',
      roles: []
    }
    this.roles = []
  }

  ngOnInit(): void {
    this.readRoles()
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.userService.readUser(id).subscribe(result => {
      this.userInfo.id = result.id
      this.userInfo.name = result.name
      this.userInfo.surname = result.surname
      this.userInfo.email = result.email
      result.roles.forEach(element => {
        if(element.name.includes("CAN_READ_USERS")) this.readRole = true
        if(element.name.includes("CAN_CREATE_USERS")) this.createRole = true
        if(element.name.includes("CAN_UPDATE_USERS")) this.updateRole = true
        if(element.name.includes("CAN_DELETE_USERS")) this.deleteRole = true
        if(element.name.includes("CAN_SEARCH_MACHINES")) this.searchMachinesRole = true
        if(element.name.includes("CAN_START_MACHINES")) this.startMachinesRole = true
        if(element.name.includes("CAN_STOP_MACHINES")) this.stopMachinesRole = true
        if(element.name.includes("CAN_RESTART_MACHINES")) this.restartMachinesRole = true
        if(element.name.includes("CAN_CREATE_MACHINES")) this.createMachinesRole = true
        if(element.name.includes("CAN_SCHEDULE_MACHINES")) this.scheduleMachinesRole = true
        if(element.name.includes("CAN_DESTROY_MACHINES")) this.destroyMachinesRole = true
      });
    })
  }

  updateUser(): void {
    if(this.readRole) this.addRole("CAN_READ_USERS")
    if(this.createRole) this.addRole("CAN_CREATE_USERS")
    if(this.updateRole) this.addRole("CAN_UPDATE_USERS")
    if(this.deleteRole) this.addRole("CAN_DELETE_USERS")
    if(this.searchMachinesRole) this.addRole("CAN_SEARCH_MACHINES")
    if(this.startMachinesRole) this.addRole("CAN_START_MACHINES")
    if(this.stopMachinesRole) this.addRole("CAN_STOP_MACHINES")
    if(this.restartMachinesRole) this.addRole("CAN_RESTART_MACHINES")
    if(this.createMachinesRole) this.addRole("CAN_CREATE_MACHINES")
    if(this.scheduleMachinesRole) this.addRole("CAN_SCHEDULE_MACHINES")
    if(this.destroyMachinesRole) this.addRole("CAN_DESTROY_MACHINES")
    console.log(this.userInfo)
    this.userService.updateUser(
      this.userInfo
    ).subscribe({
      next: (result) => {
      this.userInfo.roles = []
      },
      error: (error) => {
      this.userInfo.roles = []
      alert("The information you have entered is invalid.")
      }
    })
  }

  readRoles(): void{
    this.userService.readRoles().subscribe(result => {
      this.roles = result
    })
  }

  addRole(name: string): void{
    this.roles.forEach(element => {
      if(element.name.includes(name))
        this.userInfo.roles.push(element)
    })
  }
}
