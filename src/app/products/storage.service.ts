import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'
import { AngularFirestore } from '@angular/fire/firestore'
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

	allPhotosUrl = [];
	index: number = 0;

  constructor(private fs: AngularFireStorage, private afs: AngularFirestore) { }

  getProducts(){
  	this.fs.ref("products")
  }

  upImgs(imgsElem){
    let length = imgsElem.files.length,
      output = [];

    for(let i = 0; i < length; i++){
      let img = imgsElem.files[i];
      output.push(this.fs.ref("products/"+ this.afs.createId() + img.name).put(img))
    }

    return new Promise(rsolve => {

      forkJoin(output).subscribe(data => {
        let All = [];
        data.map(item => {
          All.push(this.fs.ref("products/"+ item.metadata.name).getDownloadURL())
        })
        forkJoin(All).subscribe(url => rsolve(url))
      })

    })

  }

  removeImg(imgName): Observable<any[]>{
    let Imageslength = imgName.length;
    let DelImages = [];
    for (let i = 0; i < Imageslength; i++ ){
      let imgUrl = imgName[i],
        start = imgUrl.indexOf("products%2F"),
        end = imgUrl.indexOf("?alt"),
        extractName = imgUrl.slice(start, end),
        name = extractName.replace("products%2F", "");
      DelImages.push( this.fs.ref("products/" + name).delete() );
    }
    return forkJoin(DelImages);
  }


}
