import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CartComponent} from './cart/cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {SingleComponent} from './single/single.component';

const routes: Routes = [
	{path:"cart", component: CartComponent},
	{path:"check-out", component: CheckOutComponent},
	{path:"single/:id", component: SingleComponent},
]

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class ProductsRoutingModule {

}