import { Component, OnInit } from '@angular/core';
import { ErrorMessageInfo } from '../model';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-error-history',
  templateUrl: './error-history.component.html',
  styleUrls: ['./error-history.component.css']
})
export class ErrorHistoryComponent implements OnInit {

  errorMessageList: Array<ErrorMessageInfo>

  constructor(private machineService: MachineService) {
    this.errorMessageList = []
  }

  ngOnInit(): void {
    this.machineService.readErrorMessages(
      localStorage.getItem("email")!
    ).subscribe(result => {
      this.errorMessageList = result
    })
  }
}
