import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

	constructor(private af: AngularFirestore) {}

	saveSignupData(name, email, id, admin, demoMode = true){
		this.af.doc("users/" + id + "/").ref.set({name, email, admin, demoMode});
	}

	getProducts(){            
		return this.af.collection("products").snapshotChanges();
	}

	getProductById(id){
		return this.af.doc("products/" + id).valueChanges();
	}

	checkIfExists(id){
		return this.af.doc("products/" + id).get();
	}

	getUserData(id){
		return this.af.doc("users/" + id).valueChanges();
	}

	removeProduct(id){
		return this.af.collection("products").doc(id).delete()
		.then(()=>console.log("removed"))
		.catch(()=>console.log("error"))
	}

	addProduct(name, desc, price, photoUrl, cat){
		return this.af.collection("products").add({ name, desc, price, photoUrl, cat});
	}

	updateProduct(product){
		return this.af.doc("products/" + product.id).update({name: product.name, price: product.price})
	}

	addMsg(name, sender, msg){
		return this.af.collection("msgs").add({ name, sender, msg});
	}

	addOrder(name, address, notes = '', products){
		return this.af.collection("order").add({ name, address, notes, products});
	}

	get getOrders(){            
		return this.af.collection("order").snapshotChanges();
	}

	removeOrder(id){
		return this.af.collection("order").doc(id).delete();
	}

	getMsgs(){            
		return this.af.collection("msgs").snapshotChanges();
	}

	removeMsg(id){
		return this.af.collection("msgs").doc(id).delete();
	}


}
