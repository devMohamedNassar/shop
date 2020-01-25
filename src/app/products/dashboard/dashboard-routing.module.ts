import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './admin/admin.component';
import {AddProductComponent} from './admin/add-product/add-product.component';
import {RemoveProductComponent} from './admin/remove-product/remove-product.component';
import {MsgsComponent} from './admin/msgs/msgs.component';
import {OrdersComponent} from './admin/orders/orders.component';

import {AdminGuard} from './admin.guard';

const routes = [
	{path:"dashboard", component: AdminComponent, canActivateChild: [AdminGuard], children: [
		{path: "", redirectTo: "add", pathMatch: "full"},
		{path: "add", component: AddProductComponent},
		{path: "remove", component: RemoveProductComponent},
		{path: "messages", component: MsgsComponent},
		{path: "orders", component: OrdersComponent}
	]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class DashboardRoutingModule {}