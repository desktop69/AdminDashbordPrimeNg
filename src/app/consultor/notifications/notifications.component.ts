import { Component } from '@angular/core';
import { SendNotificationRequest, WebSocketService } from '../services/web-socket.service';
import { Notificationobjects } from '../models/notification.model';
import { data } from 'src/app/utils/data';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications: Notificationobjects[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(private notificationService: WebSocketService, public authService: AuthService) { }

  ngOnInit() {

    this.notificationService.connectToWebSocket()
      .pipe(takeUntil(this.ngUnsubscribe), take(1))

      .subscribe(() => this.loeadnewNotification())
    this.getAllNotifications();

  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  loeadnewNotification() {
    this.notificationService.getNotifications().subscribe(data => {
      console.log('Received new notification:', data);
      this.notifications.unshift(data);
    });
  }
  getAllNotifications() {
    const loggedUser = this.authService.getLoggedInUserId();
    if (!loggedUser) {
      console.log('Invalid authorization token');
      return;
    }
    this.notificationService.getAllNotifications(loggedUser).subscribe((data) => {
      console.log(data);
      this.notifications = data;
    });
  }

  sendNotification() {
    const request: SendNotificationRequest = {
      "OfferId":"",
      "senderId": "641d7acb17571df6a24d154",
      "recipientId": "643f0666969192424352e3fa",
      "content": "belhassenaa 2",
      "category": "general"
    };

    this.notificationService.sendNotification(request).subscribe(
      (notification) => {
        console.log('Notification sent:', notification);
      },
      (error) => {
        console.error('Error sending notification:', error);
      },
    );
  }
}
