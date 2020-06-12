import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toast: ToastrService) {}

  success(message, header = '') {
    this.toast.success(header, message);
  }

  warning(message, header = '') {
    this.toast.warning(header, message);
  }

  error(message, header = '') {
    this.toast.error(header, message);
  }

  info(message, header = '') {
    this.toast.info(header, message);
  }
}
