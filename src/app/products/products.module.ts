import {NgModule} from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {CartComponent} from './cart/cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {HomeComponent} from './home/home.component';
import {SingleComponent} from './single/single.component';
import {PopupComponent} from './home/popup/popup.component';

import {ProductsRoutingModule} from './products-routing.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
	declarations: [
		CartComponent,
		CheckOutComponent,
		HomeComponent,
		SingleComponent,
		PopupComponent
	],
	imports: [
		ProductsRoutingModule,
		SharedModule,
		DashboardModule,
	    AngularFirestoreModule,
	    AngularFireStorageModule,
	]
})
export class ProductsModule {}