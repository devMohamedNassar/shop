import { Component, OnInit, OnDestroy, ElementRef, Renderer2, HostListener } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { DbService } from '../db.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit, OnDestroy {

	elem: any;
	faTimes = faTimes;
	slider;
	product: Product = {};
	id: string = '';
	quantity: number;
	animate: boolean = false;
	@HostListener('window:resize') onWindowResize(){
		this.setImgsHeightToParent();
	}

	constructor(
		private elemRef: ElementRef, 
		private render: Renderer2, 
		private ar: ActivatedRoute, 
		private dbs: DbService, 
		private router: Router,
		private cartServ: CartService, 
		private alerts: AlertService
		) { }

	ngOnInit() {
		this.elem = this.render.parentNode(this.elemRef.nativeElement);
		this.id = this.ar.snapshot.paramMap.get("id");
		this.dbs.checkIfExists(this.id).subscribe(result => {
			if (result.exists){
				this.dbs.getProductById(this.id).subscribe(data => {
					this.product = data;
				});
			} else {
				this.router.navigate(["notFound"]);
			}
		})

		let currentProduct = this.cartServ.cartProducts.filter(item => item.id == this.id)[0];
		this.quantity = currentProduct && currentProduct.quantity;

		this.setImgsHeightToParent();
	}

	ngOnDestroy() {
		clearInterval(this.slider);
	}

	imgSlider(){
		this.slider = setInterval(()=>{
			let allImages = this.elem.querySelectorAll(".images img"),
				nextIndex, i;
			for(i = 0; i <= allImages.length; i++){
				
				let currentElem = allImages[i].classList.contains("active");
				if (currentElem) {
					break;
				}
			}
			nextIndex = i < (allImages.length - 1) ? i + 1 : 0;
			allImages[i].classList.remove("enter");
			allImages[i].classList.add("out");
			allImages[nextIndex].classList.add("active", "enter");
			setTimeout(() => {
				allImages[i].classList.remove("active", "out");
			},1200);
			console.log(i);
		},3000)
	}

	slide(index, e){
		
		let allImages = this.elem.querySelectorAll(".images .wrapper img"),
			nextIndex, i;

		if (this.animate == true || allImages[index].classList.contains("active")) return
		this.activeThum(e);
		this.animate = true;

		for(i = 0; i <= allImages.length; i++){
			
			let currentElem = allImages[i].classList.contains("active");
			if (currentElem) {
				break;
			}
		}

		nextIndex = index;/*i < (allImages.length - 1) ? i + 1 : 0;*/
		allImages[i].classList.remove("enter");
		allImages[i].classList.add("out");
		allImages[nextIndex].classList.add("active", "enter");
		setTimeout(() => {
			allImages[i].classList.remove("active", "out");
			this.animate = false;
		},1200);
	}

	activeThum(e){
		let thumbnails = this.elem.querySelectorAll(".images .thumbnails img");
		Array.prototype.map.call(thumbnails, item => item.classList.remove("active"));
		e.target.classList.add("active");
	}

	setImgsHeightToParent() {
		let parent = this.elem.querySelectorAll('.images .wrapper')[0],
			img = this.elem.querySelectorAll('.wrapper img')[0] || '',
			imgHeight = img ? window.getComputedStyle(img).getPropertyValue('height') : '390px';
		
		parent.style.height = imgHeight;
	}

	onAdd(quantity){
		if ( this.cartServ.isExsist(this.id) ){
			this.alerts.showAlert(`“${this.product.name}” already in the cart`, 'danger');
		}else{
			this.alerts.showAlert(`“${this.product.name}” has been added to your cart`);
			this.cartServ.addToCart(this.id, +quantity);
		}
	}

	onAddQuantity(val){
		this.cartServ.updateQuantity(this.id, val)
	}


}
