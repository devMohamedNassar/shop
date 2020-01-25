import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DbService } from '../../../db.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	orders:  Array<any> = [];
	Products: Array<any> = [];
	open: boolean = false;

  constructor(private dbServ: DbService) { }

  ngOnInit() {
  	this.dbServ.getOrders
  		.pipe(
  			map(data => {
				return data.map(item => {
						let name = item.payload.doc.data()["name"] ? item.payload.doc.data()["name"] : '',
							address = item.payload.doc.data()["address"] ? item.payload.doc.data()["address"] : '',
							notes = item.payload.doc.data()["notes"] ? item.payload.doc.data()["notes"] : '',
							products = item.payload.doc.data()["products"] ? item.payload.doc.data()["products"] : '';
						return {
							id: item.payload.doc.id,
							name: name,
							address: address,
							notes: notes,
							products: products
						}
					})
  			})
  		).subscribe(items => this.orders = items);
  }

  onView(produsts){
  	this.Products = produsts;
  	this.open = true;
  }

  remove(id){
  	this.dbServ.removeOrder(id);
  }

}
