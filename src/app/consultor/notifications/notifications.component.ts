import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { Notificationobjects } from '../models/notification.model';
import { data } from 'src/app/utils/data';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject,  takeUntil } from 'rxjs';
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
    this.notificationService.getAllNotifications().subscribe((data) => {
      console.log(data);
      this.notifications = data;
    });
  }
}
