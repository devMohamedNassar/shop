import {NgModule} from '@angular/core';

import {AdminComponent} from './admin/admin.component';
import {AddProductComponent} from './admin/add-product/add-product.component';
import {MsgsComponent} from './admin/msgs/msgs.component';
import {OrdersComponent} from './admin/orders/orders.component';
import {RemoveProductComponent} from './admin/remove-product/remove-product.component';

import {OpenModalDirective} from './admin/orders/open-modal.directive';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
	declarations: [
		AdminComponent,
		AddProductComponent,
		MsgsComponent,
		OrdersComponent,
		RemoveProductComponent,
		OpenModalDirective
	],
	imports: [
		DashboardRoutingModule,
		SharedModule
	]
})
export class DashboardModule {

}