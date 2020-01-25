import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
	{path:"login", component: LoginComponent, canActivate: [AuthGuard]},
	{path:"signup", component: SignupComponent, canActivate: [AuthGuard]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)]
})

export class AuthRoutingModule {

}