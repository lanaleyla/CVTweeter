import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { DirtyFormGuard } from '../core/guards/dirty-form.guard';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canDeactivate: [DirtyFormGuard] },
  { path: 'register', component: RegisterFormComponent ,canDeactivate: [DirtyFormGuard]},
];

@NgModule({
  declarations: [],
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    DirtyFormGuard,
  ],
})
export class AuthRoutingModule { }
