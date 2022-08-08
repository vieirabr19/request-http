import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal.component';

enum AlertTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertPrimary(message: string){
    this.showAlert(message, AlertTypes.PRIMARY);
  }

  showAlertSecondary(message: string){
    this.showAlert(message, AlertTypes.SECONDARY);
  }

  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertWarning(message: string){
    this.showAlert(message, AlertTypes.WARNING);
  }

  showAlertInfo(message: string){
    this.showAlert(message, AlertTypes.INFO);
  }

  showAlertLight(message: string){
    this.showAlert(message, AlertTypes.LIGHT);
  }

  showAlertDark(message: string){
    this.showAlert(message, AlertTypes.DARK);
  }
}
