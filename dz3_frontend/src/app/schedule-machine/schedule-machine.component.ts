import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MachineScheduleInfo } from '../model';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-schedule-machine',
  templateUrl: './schedule-machine.component.html',
  styleUrls: ['./schedule-machine.component.css']
})
export class ScheduleMachineComponent implements OnInit {

  scheduleForm: FormGroup
  machineScheduleInfo: MachineScheduleInfo
  startBtn: boolean = false
  stopBtn: boolean = false
  restartBtn: boolean = false

  constructor(private machineService: MachineService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.scheduleForm = this.formBuilder.group({
      date_field: ['', [Validators.required]],
      time_field: ['', [Validators.required]]
    })
    this.machineScheduleInfo = {
      id: 0,
      operation: '',
      date: '',
      time: ''
    }
  }

  ngOnInit(): void {
  }

  scheduleMachine(): void {
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.machineScheduleInfo.id = id
    if(this.startBtn) this.machineScheduleInfo.operation = "START"
    if(this.stopBtn) this.machineScheduleInfo.operation = "STOP"
    if(this.restartBtn) this.machineScheduleInfo.operation = "RESTART"
    if(!this.startBtn && !this.stopBtn && !this.restartBtn) alert("You must select an operation.")
    console.log(this.machineScheduleInfo)
    this.machineService.scheduleMachine(
      this.machineScheduleInfo
    ).subscribe({
      next: (result) => {
      this.scheduleForm.reset()
      },
      error: (error) => {
      this.scheduleForm.reset()
      alert("The information you have entered is invalid.")
      }
    })
  }
}
