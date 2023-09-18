import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MachineInfo, MachineSearchFilters } from '../model';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-get-machines',
  templateUrl: './get-machines.component.html',
  styleUrls: ['./get-machines.component.css']
})
export class GetMachinesComponent implements OnInit, OnDestroy {

  searchForm: FormGroup
  machineSearchFilters: MachineSearchFilters
  machineList: Array<MachineInfo>
  runningStatus: boolean = false
  stoppedStatus: boolean = false
  router: Router
  someSubscription: any

  constructor(private machineService: MachineService, router: Router, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      name_field: [''],
      status_field: [''],
      dateFrom_field: [''],
      dateTo_field: ['']
    })
    this.machineSearchFilters = {
      name: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    }
    this.machineList = []
    this.router = router

    https://medium.com/beingcoders/angular-basics-refresh-an-angular-component-without-reloading-the-same-component-b6c513f06fb2
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
    this.machineService.readMachines(
      localStorage.getItem("email")!
    ).subscribe(result => {
      this.machineList = result
    })
  }

  ngOnDestroy(): void {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  search(): void {
    if(this.runningStatus) this.machineSearchFilters.status += "RUNNING,"
    if(this.stoppedStatus) this.machineSearchFilters.status += "STOPPED"
    this.machineService.readFilteredMachines(
      localStorage.getItem("email")!,
      this.machineSearchFilters.name!.trim(),
      this.machineSearchFilters.status,
      this.machineSearchFilters.dateFrom,
      this.machineSearchFilters.dateTo
    ).subscribe({
      next: (result) => {
      this.machineList = result
      this.searchForm.reset()
      this.runningStatus = false
      this.stoppedStatus = false
      this.machineSearchFilters.name = ''
      this.machineSearchFilters.status = ''
      this.machineSearchFilters.dateFrom = ''
      this.machineSearchFilters.dateTo = ''
      },
      error: (error) => {
      this.searchForm.reset()
      this.runningStatus = false
      this.stoppedStatus = false
      this.machineSearchFilters.name = ''
      this.machineSearchFilters.status = ''
      this.machineSearchFilters.dateFrom = ''
      this.machineSearchFilters.dateTo = ''
      alert("The filters you have entered are invalid.")
      }
    })
  }

  startMachine(machineId: number): void {
    this.machineService.startMachine(machineId).subscribe(result => {
      this.router.navigate(['/get_machines'])
    })
  }

  stopMachine(machineId: number): void {
    this.machineService.stopMachine(machineId).subscribe(result => {
      this.router.navigate(['/get_machines'])
    })
  }

  restartMachine(machineId: number): void {
    this.machineService.restartMachine(machineId).subscribe(result => {
      this.router.navigate(['/get_machines'])
    })
  }
  
  destroyMachine(userId: number): void {
    this.machineService.destroyMachine(userId).subscribe(result => {
      this.router.navigate(['/get_machines'])
    })
    this.machineService.readMachines(
      localStorage.getItem("email")!
    ).subscribe(result => {
      this.machineList = result
    })
  }

  getPermission(permission: string): boolean {
    if(localStorage.getItem("roles")?.includes(permission)) 
      return true
    else
      return false
  }

  logOut(): void {
    localStorage.setItem("token", '')
    localStorage.setItem("roles", '')
    localStorage.setItem("email", '')
  }
}
