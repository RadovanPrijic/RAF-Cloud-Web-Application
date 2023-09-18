import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorHistoryComponent } from './error-history/error-history.component';
import { GetMachinesComponent } from './get-machines/get-machines.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { GetMachinesGuard } from './guards/get-machines.guard';
import { GetUsersGuard } from './guards/get-users.guard';
import { LoginGuard } from './guards/login.guard';
import { PostMachineGuard } from './guards/post-machine.guard';
import { PostUserGuard } from './guards/post-user.guard';
import { ScheduleMachineGuard } from './guards/schedule-machine.guard';
import { UpdateUserGuard } from './guards/update-user.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostMachineComponent } from './post-machine/post-machine.component';
import { PostUserComponent } from './post-user/post-user.component';
import { ScheduleMachineComponent } from './schedule-machine/schedule-machine.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canDeactivate: [LoginGuard]
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "get_users",
    component: GetUsersComponent,
    canActivate: [GetUsersGuard]
  },
  {
    path: "post_user",
    component: PostUserComponent,
    canActivate: [PostUserGuard]
  },
  {
    path: "update_user/:id",
    component: UpdateUserComponent,
    canActivate: [UpdateUserGuard]
  },
  {
    path: "get_machines",
    component: GetMachinesComponent,
    canActivate: [GetMachinesGuard]
  },
  {
    path: "post_machine",
    component: PostMachineComponent,
    canActivate: [PostMachineGuard]
  },
  {
    path: "schedule_machine/:id",
    component: ScheduleMachineComponent,
    canActivate: [ScheduleMachineGuard]
  },
  {
    path: "error_history",
    component: ErrorHistoryComponent,
    canActivate: [ScheduleMachineGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
