import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadingSubject:Subject<boolean> = new Subject();
  loading$ = this.loadingSubject.asObservable();

  constructor(){}

  startLoading():void{
    this.loadingSubject.next(true);
  }

  stopLoading():void{
    this.loadingSubject.next(false);
  }
}
