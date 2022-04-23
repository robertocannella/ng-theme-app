import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) {
  }

  create(product: any) {
    return this.afs.collection<any>('products').doc().set(product);
  }
  getAll(): Observable<any[]> {
    return this.afs.collection('posts').doc('coding').collection('angular').snapshotChanges().pipe(
      map((actions: any) => {
        return actions.map((a: any) => {
          const object = a.payload.doc.data() as any;
          object.id = a.payload.doc.id;
          return object;
        });
      }))
  }

  get() {
    return this.afs.collection('posts').doc('coding').collection('angular').doc('G0bujgFhU0qmr3MAIcsU').valueChanges();
  }
  update(post: any) {
    return this.afs.collection('posts').doc('coding').collection('angular').doc('G0bujgFhU0qmr3MAIcsU').update(post);
  }
  delete(productId: any) {
    return this.afs.collection('posts').doc(productId).delete();
  }
}


