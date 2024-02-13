import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  //***************** Conteneur vide (null) => contiendra les données à jour ******************/
  private currentUserId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private currentAccountId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private dataIsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private notifContent = new BehaviorSubject<Notification | null>(null);

  //***************** Observable ($ à la fin) => accessible aux components ********************/
  currentUser$: Observable<number | null> = this.currentUserId.asObservable();
  currentAccount$: Observable<number | null> = this.currentAccountId.asObservable();
  dataIsLoaded$: Observable<boolean> = this.dataIsLoaded.asObservable();
  notifContent$: Observable<Notification | null> = this.notifContent.asObservable();

  constructor() {}

  //*** Stockage du userId dans observable ****/
  userId(userId: number | null): void {
    this.currentUserId.next(userId);
  }

  //*** Stockage du accountId dans observable ****//
  accountId(accountId: number | null): void {
    this.currentAccountId.next(accountId);
  }

  //*** Stockage du accountId dans observable ****//
  dataState(dataState: boolean): void {
    this.dataIsLoaded.next(dataState);
  }

  //*** Stockage de la notification dans observable ****//
  notifState(notif: Notification | null): void {
    this.notifContent.next(notif);
    console.log("behavior is called with :", notif)
  }
}

