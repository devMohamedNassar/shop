import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';

import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
	declarations: [
		NavComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		RouterModule
	],
	exports: [
		NavComponent,
		FooterComponent,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		FontAwesomeModule,
		RouterModule
	]
})
export class SharedModule {

}