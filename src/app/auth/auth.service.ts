import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from "rxjs"


@Injectable({
  providedIn: 'root'
})

export class AuthService {

	isUser: Observable<firebase.User>

	constructor(private fauth: AngularFireAuth) { 
		this.isUser = this.fauth.user;
	}

	signup(email, password){
		return this.fauth.auth.createUserWithEmailAndPassword(email, password);
	}

	login(email, password){
		return this.fauth.auth.signInWithEmailAndPassword(email, password);
	}

	logout(){
		return this.fauth.auth.signOut();
	}


}
