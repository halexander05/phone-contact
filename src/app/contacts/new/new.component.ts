import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../../providers/contacts.service';
import { MessageService } from '../../providers/message.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  textSubmitButton = 'Agregar';
  showSpinner = false;

  id = null;
  formContact: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceContact: ContactsService,
    private serviceMessage: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'] || null;
      if (this.id) {
        this.textSubmitButton = 'Editar';
        this.serviceContact.getContact(this.id).subscribe((concatSnapshot) => {
          const data = concatSnapshot.payload.data();
          this.initForm(data);
        });
      } else {
        this.initForm();
      }
    });
  }

  onSubmit() {
    let query = null;
    let message = 'El contacto fue agregado de manera exitosa.';

    this.showSpinner = true;
    this.textSubmitButton = this.id ? 'Actualizando..' : 'Enviando..';

    const form = this.formContact;
    const data = {
      identificador: form.get('identificador').value,
      nombre: form.get('nombre').value,
      telefono: form.get('telefono').value,
      correo: form.get('correo').value,
      fechaNacimiento: moment(form.get('fechaNacimiento').value).format(
        'MM/DD/YYYY'
      ),
    };

    if (this.id) {
      query = this.serviceContact.updateContact(this.id, data);
      message = 'El contacto fue actualizado de manera exitosa.';
    } else {
      query = this.serviceContact.addContact(data);
    }

    query
      .then((response) => {
        this.resetForm();
        this.showSpinner = false;
        this.textSubmitButton = this.id ? 'Editar' : 'Agregar';

        this.serviceMessage.success(message);
        setTimeout(() => {
          this.router.navigate(['/contacts']);
        }, 3000);
      })
      .catch((error) => {
        this.showSpinner = false;
        this.textSubmitButton = this.id ? 'Editar' : 'Agregar';
        this.serviceMessage.error('Error! Algo ha salido mal.');
      });
  }

  private resetForm() {
    this.formContact.reset();
  }

  private initForm(params = null) {
    const identificador = params ? params.identificador : null;
    const nombre = params ? params.nombre : null;
    const telefono = params ? params.telefono : null;
    const correo = params ? params.correo : null;
    const fechaNacimiento = params ? new Date(params.fechaNacimiento) : null;

    this.formContact = this.formBuilder.group({
      identificador: [identificador, Validators.required],
      nombre: [nombre, Validators.required],
      telefono: [telefono, Validators.required],
      correo: [correo, Validators.required],
      fechaNacimiento: [fechaNacimiento, Validators.required],
    });
  }
}
