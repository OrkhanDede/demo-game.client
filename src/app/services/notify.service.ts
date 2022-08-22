import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private toastr: ToastrService) {}
  warning(msg: string, title: string) {
    this.toastr.warning(msg, title);
  }
  info(msg: string, title: string) {
    this.toastr.info(msg, title);
  }
  success(msg: string, title: string) {
    this.toastr.success(msg, title);
  }
  error(msg: string, title: string) {
    this.toastr.error(msg, title);
  }

  created() {
    this.success('Record Successfuly created!', 'Success!');
  }
  uploaded() {
    this.success('Record Successfuly uploaded!', 'Success!');
  }
  updated() {
    this.success('Record Successfuly updated!', 'Success!');
  }
  deleted() {
    this.success('Record Successfuly deleted!', 'Success!');
  }

  bulkSuccess() {
    this.success('Bulk Process Successfuly Completed!', 'Success!');
  }
  bulkValidationError() {
    this.error('Please Check Fields!', 'Validation Error!');
  }

  areYouSureAlert(
    title: string = '',
    text: string = '',
    confirmTitle: string = '',
    callback: Function = () => {}
  ) {
    Swal.fire({
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmTitle,
    }).then((result) => {
      callback(result);
    });
  }

  idleAlert(
    confirmButtonText,
    timeout,
    onOpenCallback,
    resultCallback: Function
  ) {
    Swal.fire({
      html: `<span></span>`,
      timer: timeout,
      timerProgressBar: true,
      confirmButtonText: confirmButtonText,
      allowOutsideClick: false,
      didOpen: () => {
        onOpenCallback(Swal);
      },
    }).then((result) => {
      resultCallback(result, Swal);
    });
  }
}
