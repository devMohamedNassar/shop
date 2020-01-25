import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Product} from './product';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

	getProducts = JSON.parse(localStorage.getItem("cartProducts"));
	cartProducts: Array<Product> = this.getProducts ? this.getProducts : [];
	cartProducts$: Observable<Array<Product>> = of(this.cartProducts);
	//cartNumber: number = this.cartProducts.length;

	constructor(private dbs: DbService) {}

	addToCart(id, quantitiy = 1){
		this.dbs.getProductById(id).subscribe(product => {
			product['id'] = id;
			product['quantity'] = quantitiy;
			this.cartProducts.push(product);
			localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
		});
	}

	isExsist(id):boolean{
		let item = this.cartProducts.map<string>(item => {
			return item.id
		})
		return item.includes(id);
	}

	delete(i){
		this.cartProducts.splice( i, 1 );
		localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
	}

	addQuantity(id: number, quantity:number){
		this.cartProducts[id].quantity = quantity;
		localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
	}

	clearCart(){
		this.cartProducts.length = 0;
		localStorage.setItem("cartProducts",  JSON.stringify(this.cartProducts));
	}

	updateQuantity(id: string, quantity:number){
		for(let i = 0; i < this.cartProducts.length; i++){
			if(this.cartProducts[i].id == id) {
				this.addQuantity(i, quantity);
				break;
			}
		}
	}

}


