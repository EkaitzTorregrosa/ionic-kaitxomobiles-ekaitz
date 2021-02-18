import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class MobilecrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Mobile(record) {
    return this.firestore.collection('Mobiles').add(record);
  }
  read_Mobiles() {
    return this.firestore.collection('Mobiles').snapshotChanges();
  }
  update_Mobile(recordID, record) {
    this.firestore.doc('Mobiles/' + recordID).update(record);
  }
  delete_Mobile(record_id) {
    this.firestore.doc('Mobiles/' + record_id).delete();
  }
}
