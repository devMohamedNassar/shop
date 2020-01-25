import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Product} from '../product';
import { CartService } from '../cart.service';
import { DbService } from '../db.service';
import { fadeInOut } from '../../shared/animations/fadeInOut';
import { AlertService } from '../../shared/alert.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [fadeInOut]
})

export class HomeComponent implements OnInit {
	
	@HostBinding('@fadeInOut') animContent = "";
	products: Array<Product> = [];
	productName: string = '';
	alertAddToCart: number = -1;
	catTitle:String = '';
	search = faSearch;

	constructor(private cs: CartService, private dbs: DbService, private ar: ActivatedRoute, private router: Router, private alerts: AlertService) { }

	ngOnInit() {

		this.ar.paramMap.subscribe((param: any) => {
			if(param.params.cat){
				this.category(param.params.cat);
			} else {
				this.dbs.getProducts().subscribe(data => {
					this.products = data.map(item => {
						return {
							id: item.payload.doc.id,
							name: item.payload.doc.data()["name"],
							price: item.payload.doc.data()["price"],
							photoUrl: item.payload.doc.data()["photoUrl"]
						}
					})
				})
			}
		})
		
	}

	addProduct(i, id){
		this.productName = this.products[i].name;
		this.alertAddToCart = i;
		if ( this.cs.isExsist(id) ){
			this.alerts.showAlert(`“${this.productName}” already in the cart`, 'danger');
		}else {
			this.alerts.showAlert(`“${this.productName}” has been added to your cart`);
			this.cs.addToCart(id);
		}

	}

	category(catName){
	    this.dbs.getProducts().subscribe(data => {
	      this.animContent = catName;
	      this.products = [];
	      data.map(item => {
	          if (catName == item.payload.doc.data()["cat"]){
	            this.products.push( {
	              id: item.payload.doc.id,
	              name: item.payload.doc.data()["name"],
	              price: item.payload.doc.data()["price"],
	              photoUrl: item.payload.doc.data()["photoUrl"]
	            })
	          }
	      })
	      if (this.products.length == 0) this.router.navigate([""])
	      else this.catTitle = "category: " + catName;

	    })
	}

}
