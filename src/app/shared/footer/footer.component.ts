import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { Alert } from '../../shared/alert';
import { AlertService } from '../../shared/alert.service';
import { Fade } from '../../shared/animations/fade';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [Fade.fadeUpDown],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

	alert: Alert;

	twitter = faTwitter;
	facebook = faFacebook;
	linkedin = faLinkedin;

	constructor(private alerts: AlertService) { }

	ngOnInit() {
		this.alert = this.alerts.alert;

	}

}
