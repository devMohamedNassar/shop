import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './products/home/home.component';
import { PopupComponent } from './products/home/popup/popup.component';

const routes: Routes = [
	{path:"", component: HomeComponent},
	{path:"category/:cat", component: HomeComponent},
	{path:"product/:id", component: PopupComponent, outlet: 'popup'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})]
})
export class AppRoutingModule { }
