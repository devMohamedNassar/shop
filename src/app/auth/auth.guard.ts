import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private as: AuthService, private router: Router){}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise(resolve=>{
			this.as.isUser.subscribe(data=>{
				if (!data) resolve(true);
				else {
					this.router.navigate(["/"]);
				}
			})
		})
	}
  
}
