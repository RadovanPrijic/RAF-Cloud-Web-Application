import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginInfo } from '../model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  userLoginInfo: UserLoginInfo
  router: Router

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, router: Router) {
    this.loginForm = this.formBuilder.group({
      email_field: ['', [Validators.required]],
      password_field: ['', [Validators.required]],
    })
    this.userLoginInfo = {
      email: '',
      password: ''
    }
    this.router = router
   }

  ngOnInit(): void {}

  login(): void {
    this.userLoginInfo = {
      email: this.loginForm.get('email_field')?.value,
      password: this.loginForm.get('password_field')?.value
    }
    this.loginService.login(
      this.userLoginInfo
    ).subscribe({
      next: (result) => {
      this.loginForm.reset()
      localStorage.setItem("token", result.jwt)
      let token = localStorage.getItem("token")
      let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]))
      localStorage.setItem("roles", decodedJWT.roles)
      localStorage.setItem("email", decodedJWT.email)
      this.router.navigate(['/home'])
      },
      error: (error) => {
      this.loginForm.reset()
      alert("The entered credentials are invalid.")
      }
    })
  }
}
