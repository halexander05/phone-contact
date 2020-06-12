import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Routing  */
import { AppRoutingModule } from './app-routing.module';

/* Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewComponent } from './contacts/new/new.component';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { connection } from './database/connection';

/* Material */
import { MaterialModule } from './material/material.module';

/* ngx-toatr */
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ContactsComponent, NewComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      maxOpened: 2,
      autoDismiss: true,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    AngularFireModule.initializeApp(connection)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
