import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role, UserInfo, UserInfoWithPassword } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.usersApi;
  private headers: HttpHeaders

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }

  readUsers(): Observable<Array<UserInfo>> {
    return this.httpClient.get<Array<UserInfo>>(`${this.apiUrl}/read/all`, { headers: this.headers })
  }

  readUser(userId: number): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`${this.apiUrl}/read/${userId}`, { headers: this.headers })
  }

  readRoles(): Observable<Array<Role>> {
    return this.httpClient.get<Array<Role>>(`${this.apiUrl}/read/roles`, { headers: this.headers })
  }

  postUser(user: UserInfoWithPassword): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(`${this.apiUrl}/create`, user, { headers: this.headers })
  }

  updateUser(user: UserInfo): Observable<UserInfo> {
    return this.httpClient.put<UserInfo>(`${this.apiUrl}/update`, user, { headers: this.headers })
  }

  deleteUser(userId: number): Observable<Object> {
    return this.httpClient.delete<Object>(`${this.apiUrl}/delete/${userId}`, { headers: this.headers })
  }
}
