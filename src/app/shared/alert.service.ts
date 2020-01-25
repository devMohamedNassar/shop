import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

	alert: Alert = {
		msg : '',
		type: "primary",
		hide: true
	}

	timer: any;

	constructor() { }


	showAlert(msg, type="primary"){
		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(() => this.alert.hide = true ,3000);
		this.alert.msg = msg;
		this.alert.hide = false;
		if(type) this.alert.type = type;
	}


}
