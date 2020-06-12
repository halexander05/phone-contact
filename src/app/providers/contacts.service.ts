import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private firestore: AngularFirestore) {}

  /* Obtiene Todos los contactos */
  getContacts() {
    return this.firestore.collection('contacts').snapshotChanges();
  }

  /* Obtiene un contacto por id */
  getContact(idContact) {
    return this.firestore
      .collection('contacts')
      .doc(idContact)
      .snapshotChanges();
  }

  /* Agrega un nuevo contacto */
  addContact(data) {
    return this.firestore.collection('contacts').add(data);
  }

  /* Actualizar un contacto por id */
  updateContact(idContact: any, data: any) {
    return this.firestore.collection('contacts').doc(idContact).set(data);
  }

  /* Eliminar un contacto */
  deleteContact(contactId) {
    return this.firestore.collection('contacts').doc(contactId).delete();
  }
}
