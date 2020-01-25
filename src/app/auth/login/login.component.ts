import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	errors: boolean = false;

	constructor(private as: AuthService, private router: Router) { }

		ngOnInit() {
		}

		validate(f) {
			let formVal = f.value,
				email = formVal.email,
				password = formVal.password;
			this.as.login(email, password)
				.then(() => {
					this.router.navigate(["/"]);
				})
				.catch(() => this.errors = true )
		}

	}
