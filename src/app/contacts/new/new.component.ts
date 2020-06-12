import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../../providers/contacts.service';
import { MessageService } from '../../providers/message.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  textSubmitButton = 'Agregar Nuevo Contacto';
  showSpiner = false;

  formContact: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private serviceContact: ContactsService,
    private serviceMessage: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.showSpiner = true;
    this.textSubmitButton = 'Enviando..';

    const form = this.formContact;
    const data = {
      identificador: form.get('identificador').value,
      nombre: form.get('nombre').value,
      telefono: form.get('telefono').value,
      correo: form.get('correo').value,
      fechaNacimiento: moment(form.get('fechaNacimiento').value).format(
        'DD/MM/YYYY'
      ),
    };

    this.serviceContact
      .addContact(data)
      .then((response) => {
        this.resetForm();
        this.showSpiner = false;
        this.textSubmitButton = 'Agregar Nuevo Contacto';

        this.serviceMessage.success(
          'El contacto fue agregado de manera exitosa.'
        );
        setTimeout(() => {
          this.router.navigate(['/contacts']);
        }, 3000);
      })
      .catch((error) => {
        this.showSpiner = false;
        this.textSubmitButton = 'Agregar Nuevo Contacto';
        this.serviceMessage.error('Error! Algo ha salido mal.');
      });
  }

  private resetForm() {
    this.formContact.reset();
  }

  private initForm() {
    this.formContact = this.formBuilder.group({
      identificador: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }
}
