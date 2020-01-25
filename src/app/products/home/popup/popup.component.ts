import { Component, OnInit, HostBinding } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import { DbService } from '../../db.service';
import { Product } from '../../product';
import { popupAnim } from '../../../shared/animations/popupAnim'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [popupAnim]
})
export class PopupComponent implements OnInit {
	@HostBinding('@popupAnim') popupAnim = 'hide';
	exitIcon = faTimes;
	product: Product = {};
	photo: string = '';
	id: string = '';

	constructor(private ar: ActivatedRoute, private dbs: DbService, private router: Router) { }

	ngOnInit() {

		this.id = this.ar.snapshot.paramMap.get("id");
		this.dbs.checkIfExists(this.id).subscribe(result => {
			if (result.exists){
				this.dbs.getProductById(this.id).subscribe(data => {
					this.product = data;
					this.photo= this.product.photoUrl[0];
					this.popupAnim = "show";
				});
			} else {
				this.router.navigate(["notFound"]);
			}
		})

	}

	exit(){
		this.router.navigate([{ outlets: { popup: null }}]);
	}

}
