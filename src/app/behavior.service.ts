import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  // je crée une conteneur vide (null) => contiendra l'id du User/Account concerné
  private currentUserId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private currentAccountId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  // je crée une observable ($ à la fin) => accessible aux components (ils pourront juste l'observer)
  currentUser$: Observable<number | null> = this.currentUserId.asObservable();
  currentAccount$: Observable<number | null> = this.currentAccountId.asObservable();

  constructor() {}

  // UserIdToBehavior => stock de userId dans BehaviorSubject
  userIdToBehavior(userId: number): void {
    this.currentUserId.next(userId);
  }

  // AccountIdToBehavior => stock de userId dans BehaviorSubject
  accountIdToBehavior(accountId: number): void {
    this.currentAccountId.next(accountId);
  }
}
