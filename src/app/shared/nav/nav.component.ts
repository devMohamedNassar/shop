import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {BehaviorSubject} from 'rxjs';
import {trigger, style, state, animate, transition} from '@angular/animations';

import { CartService } from '../../products/cart.service';
import { Product} from '../../products/product';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { DbService } from '../../products/db.service';
import { User } from '../../products/dashboard/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
  	trigger('collapse', [
  		state('true', style({height: '*', opacity: 1})),
  		state('false', style({height: 0, opacity: 0.5})),
  		transition('true <=> false', animate(300)),
  	])
  ]
})
export class NavComponent implements OnInit {

	iscollapse: boolean = false;
	faShoppingCart = faShoppingCart;
	cartProducts: Array<Product> = [];
	isUser:boolean = false;
	isAdmin:boolean = false;

	constructor(private cs: CartService, private as: AuthService, private router: Router, private dbs: DbService) { }

	ngOnInit() {
		this.cs.cartProducts$.subscribe(data => {
			this.cartProducts = data;
		});

		this.as.isUser.subscribe(data => {
			this.isUser = data ? true : false;
			if(data){
				this.dbs.getUserData(data.uid).subscribe( (result: User = {admin: false}) => {
					this.isAdmin = result.admin;
				})
			}
		});

	}

	logout(){
		this.as.logout().then(() => this.router.navigate(['/login']));
	}

}
