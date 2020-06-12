import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private firestore: AngularFirestore) {}

  /*Obtiene Todos los contactos */
  getContacts() {
    return this.firestore.collection('contacts').snapshotChanges();
  }

  /* Agrega un nuevo contacto */
  addContact(data) {
    return this.firestore.collection('contacts').add(data);
  }
}
