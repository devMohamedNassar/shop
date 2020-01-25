import {NgModule} from '@angular/core';

import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {OtherRoutingModule} from './other-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [
		AboutComponent,
		ContactComponent,
		NotFoundComponent,
	],
	imports: [
		OtherRoutingModule, 
		SharedModule
	]
})
export class OtherModule {

}