import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DbService } from '../db.service';
import { CartService } from '../cart.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

	checkOutForm: FormGroup;
	loading: boolean = false;

  constructor(
  	private dbServ: DbService, 
  	private alerts: AlertService,
  	private router: Router,
    private cartServ: CartService
  	) { }

  ngOnInit() {
  	this.checkOutForm = new FormGroup({
  		"fname": new FormControl(null, [Validators.required]),
  		"lname": new FormControl(null, [Validators.required]),
  		"address1": new FormControl(null, [Validators.required]),
  		"address2": new FormControl(),
  		"orderNotes": new FormControl(),
  	})
  }

  onSubmit(){
  	this.loading = true;
  	let all = this.checkOutForm.value,
  		name = all.fname + ' ' + all.lname,
  		address = all.address1 + ' ' + (all.address2 || ''),
  		notes = all.orderNotes || '';

  	this.dbServ.addOrder(name, address, notes, this.cartServ.cartProducts).then ( _=> {
  		this.alerts.showAlert('Your order has been sent. Thank you!', "success");
  		this.router.navigate(["/"]);
      this.cartServ.clearCart();
  	}).catch(_=>{
  		this.alerts.showAlert('Sorry your order can not be sent.', "danger");
  	})

  }

  get f(){
  	return this.checkOutForm.controls;
  }

}
