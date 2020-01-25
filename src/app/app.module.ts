import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {ProductsModule} from './products/products.module';
import {OtherModule} from './other/other.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDHC9ZE7rdeWh89oe1u7xJ_tvU2CR253jA",
      authDomain: "shop-826b4.firebaseapp.com",
      databaseURL: "https://shop-826b4.firebaseio.com",
      projectId: "shop-826b4",
      storageBucket: "shop-826b4.appspot.com",
      messagingSenderId: "277034119316",
      appId: "1:277034119316:web:847ed8b26d871169"
    }),
    SharedModule,
    AuthModule,
    ProductsModule,
    OtherModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
