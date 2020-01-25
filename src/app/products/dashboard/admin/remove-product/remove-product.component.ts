import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { DbService } from '../../../db.service';
import { StorageService } from '../../../storage.service';
import { Product } from '../../../product';
import { Fade } from '../../../../shared/animations/fade'
import { AlertService } from '../../../../shared/alert.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css'],
  animations: [Fade.fade]
})
export class RemoveProductComponent implements OnInit {

	Products = [];
	editMode = '';
	saveMode = false;
	demoMode = true;
	inputDis= false;

	constructor(
		private dbs: DbService, 
		private ss: StorageService, 
		private alerts: AlertService,
		private authServ: AuthService) { }

	ngOnInit() {
		this.dbs.getProducts().subscribe(data => {
			this.Products = data.map(item => {
				let URL = item.payload.doc.data()["photoUrl"] ? item.payload.doc.data()["photoUrl"][0] : '',
					name = item.payload.doc.data()["name"] ? item.payload.doc.data()["name"] : '',
					price = item.payload.doc.data()["price"] ? item.payload.doc.data()["price"] : 0,
					main = item.payload.doc.data()["main"] ? item.payload.doc.data()["main"] : false;
				return {
					id: item.payload.doc.id,
					name: name,
					price: price,
					photoUrl: URL,
					main: main
				}
			})
		})

		this.authServ.isUser.pipe(
			switchMap(data => {
				if(data){
					return this.dbs.getUserData(data.uid)
				}else{
					return of(null)
				}
			})
		).subscribe((result: any) => {
			if(result && result.demoMode){
				this.demoMode = result.demoMode;
			}else{
				this.demoMode = false;
			}
		})

	}

	remove(id){

		this.dbs.getProductById(id).pipe(take(1)).subscribe((data:Product) => {

			if(data && data.main && this.demoMode){
				this.alerts.showAlert(`You can't remove this project in the demo mode`,"danger");
				return;
			}

			this.ss.removeImg(data.photoUrl).subscribe(results => {
				this.dbs.removeProduct(id).then(() => {
					this.alerts.showAlert(`The product has been removed`,"warning");
				});
			}, err => this.dbs.removeProduct(id).then(() => {
					this.alerts.showAlert(`The product has been removed`,"warning");
				})
			);
		})

	}

	edit(id, product:Product){
		this.editMode = id;
		this.inputDis = false;
		if(product.main && this.demoMode){
			this.inputDis = true;
		}
	}

	save(product:Product){
		if(product.main && this.demoMode){
			return;
		}
		this.saveMode = true;
		this.dbs.updateProduct(product).then(() => {
			this.editMode = '';
			this.saveMode = false;
			this.alerts.showAlert(`The update for “${product.name}” has been saved`,"success");
		});
		
	}

	input(e){
		e.preventDefault()
	}


}
