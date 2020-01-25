import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
	{path:"about", component: AboutComponent},
	{path:"contact", component: ContactComponent},
	{path:"**", component: NotFoundComponent}
]

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class OtherRoutingModule {

}