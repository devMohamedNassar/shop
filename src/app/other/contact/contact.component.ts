import { Component, OnInit } from '@angular/core';
import { DbService } from '../../products/db.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	msgSent: boolean = false;

	constructor(private db: DbService, private alerts: AlertService) { }

	ngOnInit() {
	}

	contactForm(f){
		let val = f.value,
			name = val.name,
			sender = val.email,
			msg = val.msg;

		this.msgSent = true;
		
		this.db.addMsg(name, sender, msg).then( () => {
			this.alerts.showAlert('Your message has been sent. Thank you!', "success");
			this.msgSent = false;
			f.reset();
		} ).catch( () => {
			this.alerts.showAlert('Sorry your message can not be sent.', "danger");
		} )
	}

}
