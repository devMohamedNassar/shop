import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CartService } from '../cart.service';
import { Product} from '../product';
import { Fade } from '../../shared/animations/fade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [Fade.fade]
})
export class CartComponent implements OnInit {

	Products: Array<Product>;

	constructor(private cs: CartService) { }

	ngOnInit() {
		this.cs.cartProducts$.pipe(first()).subscribe(data => this.Products = data);
	}

	deletFromCart(i){
		this.cs.delete(i);
	}

	addQuantity(i, e){
		e.target.value = e.target.value.replace(/[^0-9]/g, "");
		this.cs.addQuantity(i, +e.target.value);
	}

	minus(q, i){
		if(+q.value > 1){ q.value=+q.value -1};
		this.cs.addQuantity(i, q.value);
	}

	plus(q, i){
		if(+q.value > 0){ q.value=+q.value +1};
		this.cs.addQuantity(i, q.value);
	}

	get total(){
		let t = 0;
		for(let item of this.Products){
			t += item.price * (+item.quantity ? item.quantity : 1);
		}
		return t;
	}

}
