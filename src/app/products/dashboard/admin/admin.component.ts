import { Component, OnInit} from '@angular/core';
import { fadeInOut } from '../../../shared/animations/fadeInOut';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [fadeInOut]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	
  }
  
}
