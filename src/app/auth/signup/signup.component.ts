import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DbService } from '../../products/db.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	loader: boolean = false;
	created: boolean = false;
	errors: boolean = false;
  admin: boolean = false;
  userId: string = '';

  constructor(private as: AuthService, private dbs: DbService) { }

  ngOnInit() {
  }

  validate(f){
  	let formVal = f.value,
  		email = formVal.email,
      name = formVal.name,
  		password = formVal.password;

  	this.loader = true;

  	this.as.signup(email, password)
  		.then(data => {

        this.created = true;
        this.dbs.saveSignupData(name, email, data.user.uid, this.admin);

      })
  		.catch(error => this.errors = true);
  }

}
