import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from '../db.service';
import { AuthService } from '../../auth/auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

	constructor(private as: AuthService, private dbs: DbService, private router: Router){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

			return new Promise(resolve=>{
				this.as.isUser.subscribe(data => {
					if(data){
						this.dbs.getUserData(data.uid).subscribe( (result: User) => {
							if (result.admin) resolve(true);
							else {
								this.router.navigate(["/"]);
								resolve(false);
							}
						})
					} else {
						this.router.navigate(["/"]);
						resolve(false);
					}
				})
	  		})

	}

	canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(next, state)
	}
  
}
