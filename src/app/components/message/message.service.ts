import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  showErrorMessageSubject:Subject<boolean> = new Subject();
  showSuccessMessageSubject:Subject<boolean> = new Subject();
  errorMessageSubject:Subject<string> = new Subject();
  successMessageSubject:Subject<string> = new Subject();

  showErrorMessage$:Observable<boolean> = this.showErrorMessageSubject.asObservable();
  showSuccessMessage$:Observable<boolean> = this.showSuccessMessageSubject.asObservable();
  errorMessage$:Observable<string> = this.errorMessageSubject.asObservable();
  successMessage$:Observable<string> = this.successMessageSubject.asObservable();

  constructor(){}

  hideErrorMessage():void{
    this.showErrorMessageSubject.next(false);
  }

  hideSuccessMessage():void{
    this.showSuccessMessageSubject.next(false);
  }

  setErrorMessage(message:string):void{
    this.errorMessageSubject.next(message);
  }

  setSuccessMessage(message:string):void{
    this.successMessageSubject.next(message);
  }

  showErrorMessage(message:string):void{
    this.setErrorMessage(message);
    this.showErrorMessageSubject.next(true);
    setTimeout(() => {
      this.showErrorMessageSubject.next(false);
    }, 4000);
  }

  showSuccessMessage(message:string):void{
    this.setSuccessMessage(message);
    this.showSuccessMessageSubject.next(true);
    setTimeout(() => {
      this.showSuccessMessageSubject.next(false);
    }, 4000);
  }
}
