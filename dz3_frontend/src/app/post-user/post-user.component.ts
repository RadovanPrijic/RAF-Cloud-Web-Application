import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, UserInfo, UserInfoWithPassword } from '../model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit {

  postForm: FormGroup
  userInfo: UserInfoWithPassword
  readRole: boolean = false
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

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      name_field: ['', [Validators.required]],
      surname_field: ['', [Validators.required]],
      email_field: ['', [Validators.required]],
      password_field: ['', [Validators.required]]
    })
    this.userInfo = {
      id: 0,
      name: '',
      surname: '',
      email: '',
      password: '',
      roles: []
    }
    this.roles = []
  }

  ngOnInit(): void {
    this.readRoles()
  }

  postUser(): void {
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
    this.userService.postUser(
      this.userInfo
    ).subscribe({
      next: (result) => {
      this.postForm.reset()
      this.readRole = false
      this.createRole = false
      this.updateRole = false
      this.deleteRole = false
      this.searchMachinesRole = false
      this.startMachinesRole = false
      this.stopMachinesRole = false
      this.restartMachinesRole = false
      this.createMachinesRole = false
      this.scheduleMachinesRole = false
      this.destroyMachinesRole = false
      this.userInfo.roles = []
      },
      error: (error) => {
      this.postForm.reset()
      this.readRole = false
      this.createRole = false
      this.updateRole = false
      this.deleteRole = false
      this.searchMachinesRole = false
      this.startMachinesRole = false
      this.stopMachinesRole = false
      this.restartMachinesRole = false
      this.createMachinesRole = false
      this.scheduleMachinesRole = false
      this.destroyMachinesRole = false
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
