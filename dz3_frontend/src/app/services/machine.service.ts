import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorMessageInfo, MachineInfo, MachinePostInfo, MachineScheduleInfo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private readonly apiUrl = environment.machinesApi;
  private headers: HttpHeaders

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }

  readMachines(userEmail: string): Observable<Array<MachineInfo>> {
    return this.httpClient.get<Array<MachineInfo>>(`${this.apiUrl}/read/all?userEmail=${userEmail}`, { headers: this.headers })
  }

  readFilteredMachines(userEmail: string, name: string, status: string, 
                            dateFrom: string, dateTo: string): Observable<Array<MachineInfo>> {
    return this.httpClient.get<Array<MachineInfo>>(`${this.apiUrl}/read/filtered?userEmail=${userEmail}&name=${name}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`, { headers: this.headers })
  }

  readErrorMessages(userEmail: string): Observable<Array<ErrorMessageInfo>> {
    return this.httpClient.get<Array<ErrorMessageInfo>>(`${this.apiUrl}/read/errors?userEmail=${userEmail}`, { headers: this.headers })
  }

  startMachine(machineId: number): Observable<Object> {
    return this.httpClient.get<Object>(`${this.apiUrl}/start/${machineId}`, { headers: this.headers })
  }

  stopMachine(machineId: number): Observable<Object> {
    return this.httpClient.get<Object>(`${this.apiUrl}/stop/${machineId}`, { headers: this.headers })
  }

  restartMachine(machineId: number): Observable<Object> {
    return this.httpClient.get<Object>(`${this.apiUrl}/restart/${machineId}`, { headers: this.headers })
  }

  postMachine(machine: MachinePostInfo): Observable<MachineInfo> {
    return this.httpClient.post<MachineInfo>(`${this.apiUrl}/create`, machine, { headers: this.headers })
  }

  scheduleMachine(machine: MachineScheduleInfo): Observable<Object> {
    return this.httpClient.post<Object>(`${this.apiUrl}/schedule`, machine, { headers: this.headers })
  }

  destroyMachine(machineId: number): Observable<Object> {
    return this.httpClient.delete<Object>(`${this.apiUrl}/delete/${machineId}`, { headers: this.headers })
  }
}
