import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class SummariesService {

  constructor(private afs: AngularFirestore) { }

  getSubs() {
    return this.afs.collection('summaries').doc('heap').valueChanges();
  }
  get() {
    return this.afs.collection('summaries').doc<any>('heap').valueChanges();
  }
  // get(): Observable<any[]> {
  //   return this.afs.collection('summaries').doc('heap').snapshotChanges().pipe(
  //     map((actions: any) => {
  //       return actions.map((a: any) => {
  //         const object = a.payload.doc.data() as any;
  //         object.id = a.payload.doc.id;
  //         return object;
  //       });
  //     }))
  // }
}
