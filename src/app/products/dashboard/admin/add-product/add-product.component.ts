import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from '../../../storage.service';
import { DbService } from '../../../db.service';
import { AlertService } from '../../../../shared/alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

	loading = {loader: false};
  selectFile = false;

	constructor(private ss: StorageService, private dbs: DbService, private alerts: AlertService) { }

	@ViewChild("file", {static: false}) imgsElem: ElementRef;

	ngOnInit() { }

  add(f){
  	let formVal = f.value,
  		name = formVal.name,
  		desc = formVal.desc,
  		price = +formVal.price,
      cat = formVal.cat,
  		imgsElem = this.imgsElem.nativeElement;

    this.loading.loader = true;
  		
  	this.ss.upImgs(imgsElem).then(photoUrl => {
      this.dbs.addProduct(name, desc, price, photoUrl, cat)
        .then(data => {
            this.loading.loader = false;
            this.alerts.showAlert("New product has been added","success");
            f.resetForm();
        })
        .catch(err => this.alerts.showAlert("error! nothing has been added","danger"))
    })
  }

  checkFile(){
    if(this.imgsElem.nativeElement.files.length) this.selectFile = true;
    else this.selectFile = false;
  }

}

