import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../db.service';
import { AlertService } from '../../../../shared/alert.service';

@Component({
  selector: 'app-msgs',
  templateUrl: './msgs.component.html',
  styleUrls: ['./msgs.component.css']
})
export class MsgsComponent implements OnInit {
	msgs: any;

	constructor(private dbs: DbService, private alerts: AlertService) { }

	ngOnInit() {
		this.dbs.getMsgs().subscribe(data => {
			this.msgs = data.map(item => {
				let name = item.payload.doc.data()["name"] ? item.payload.doc.data()["name"] : '',
					sender = item.payload.doc.data()["sender"] ? item.payload.doc.data()["sender"] : '',
					msg = item.payload.doc.data()["msg"] ? item.payload.doc.data()["msg"] : '';
				return {
					id: item.payload.doc.id,
					name: name,
					sender: sender,
					msg: msg
				}
			})
		})

	}

	remove(id){
		this.dbs.removeMsg(id).then(() => {
			this.alerts.showAlert(`The Message has been removed`,"warning");
		})
	}

}
