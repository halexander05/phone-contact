import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../ui/dialog/dialog.component';
import { ContactsService } from '../providers/contacts.service';
import { MessageService } from '../providers/message.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts = [];
  tableColums = [
    'identificador',
    'nombre',
    'telefono',
    'correo',
    'fecha_de_nacimiento',
    'opciones',
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private serviceMessage: MessageService,
    private serviceContact: ContactsService
  ) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  showDialogConfirm(idContact: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { message: '¿Esta seguro que desea eliminar este contacto?' },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.contactDelete(idContact);
      }
    });
  }

  redirectForEdit(idContact: any) {
    this.router.navigate(['/contacts/edit'], {
      queryParams: { id: idContact },
    });
  }

  private getAllContacts() {
    this.serviceContact.getContacts().subscribe((contactsSnapshot) => {
      this.contacts = [];
      contactsSnapshot.forEach((contactData: any) => {
        const data = contactData.payload.doc.data();
        this.contacts.push({
          id: contactData.payload.doc.id,
          identificador: data.identificador,
          nombre: data.nombre,
          telefono: data.telefono,
          correo: data.correo,
          fechaNacimiento: data.fechaNacimiento,
        });
      });
    });
  }

  private contactDelete(idContact: string) {
    this.serviceContact
      .deleteContact(idContact)
      .then((response) => {
        this.serviceMessage.success(
          'El contacto fue eliminado de manera exitosa.'
        );
      })
      .catch((error) => {
        this.serviceMessage.error('Error! Algo ha salido mal.');
      });
  }

  redirectToNew() {
    this.router.navigate(['/contacts/new']);
  }
}
