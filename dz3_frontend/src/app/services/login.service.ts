import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, UserLoginInfo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.authApi;

  constructor(private httpClient: HttpClient) {}

  login(user: UserLoginInfo): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, user)
  }
}
