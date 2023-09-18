import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { PostUserComponent } from './post-user/post-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { GetMachinesComponent } from './get-machines/get-machines.component';
import { PostMachineComponent } from './post-machine/post-machine.component';
import { ScheduleMachineComponent } from './schedule-machine/schedule-machine.component';
import { ErrorHistoryComponent } from './error-history/error-history.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GetUsersComponent,
    PostUserComponent,
    UpdateUserComponent,
    GetMachinesComponent,
    PostMachineComponent,
    ScheduleMachineComponent,
    ErrorHistoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
