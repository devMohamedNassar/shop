import {NgModule} from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [
		LoginComponent,
		SignupComponent
	],
	imports: [
		AuthRoutingModule, 
		SharedModule,
		AngularFireAuthModule
	]
})

export class AuthModule {}