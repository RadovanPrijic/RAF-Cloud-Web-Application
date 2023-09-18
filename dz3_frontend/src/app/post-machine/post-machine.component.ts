import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachinePostInfo } from '../model';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-post-machine',
  templateUrl: './post-machine.component.html',
  styleUrls: ['./post-machine.component.css']
})
export class PostMachineComponent implements OnInit {

  postForm: FormGroup
  machinePostInfo: MachinePostInfo

  constructor(private machineService: MachineService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      name_field: ['', [Validators.required]]
    })
    this.machinePostInfo = {
      name: '',
      userEmail: ''
    }
  }

  ngOnInit(): void {
  }

  postMachine(): void {
    this.machinePostInfo.userEmail = localStorage.getItem("email")!
    this.machineService.postMachine(
      this.machinePostInfo
    ).subscribe({
      next: (result) => {
      this.postForm.reset()
      },
      error: (error) => {
      this.postForm.reset()
      alert("The information you have entered is invalid.")
      }
    })
  }
}
