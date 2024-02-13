import { Component } from '@angular/core';
import { BehaviorService } from '../shared-services/behavior.service';

interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  standalone: true
})
export class NotificationComponent {
  notification: Notification | null = null;

  constructor(
    private behaviorService: BehaviorService
  ) {}

  ngOnInit(): void {
    // BehaviorService => je récupère le contenu de la notification
    this.behaviorService.notifContent$.subscribe({
      next: (n) => {

        this.notification = n;

        if(this.notification){
          setTimeout(() => {
            this.notification = null;
          }, 2000);
        }
      }
    })
  }

  notificationColor(): string | null {
    if(this.notification){

      if (this.notification.type == 'error') {
          return "background-color:rgba(255, 0, 0, 0.5); display:block"
      } else if (this.notification.type == 'success') {
          return "background-color: rgba(0, 150, 0, 0.5); display:block"
      } else {
        return 'display:none'
      }

    } else {
      return 'display:none'
    }
  }
}
