import { Component, Input } from '@angular/core';
import { fadeInOut } from './shared/animations/fadeInOut';
import { Fade } from './shared/animations/fade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut, Fade.fadeUpDown]
})
export class AppComponent {
  title = 'shop';

  test(done){
  	console.log(done)
  }

}

