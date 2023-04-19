// this is my services 
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EMPTY, Observable, fromEvent, fromEventPattern } from 'rxjs';
import { Notificationobjects } from '../models/notification.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';


export interface SendNotificationRequest {
  OfferId:string;
  senderId: string;
  recipientId: string;
  content: string;
  category: string;
}
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private apiUrl = 'http://localhost:3011/notifications/';
  constructor(private socket: Socket, private http: HttpClient, private authService: AuthService) { }
  getNotifications(): Observable<any> {
    console.log('Subscribing to newNotification event');
    return this.socket.fromEvent<Notificationobjects>('newNotification')
  }

  // sendNotification(request: SendNotificationRequest): Promise<Notification> {
  //   return this.http.post<Notification>(this.apiUrl, request).pipe(first()).toPromise();
  // }

  sendNotification(request: SendNotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, request);
  }
  
  getAllNotifications(loggedInUserId: string): Observable<Notificationobjects[]> {
    return this.http.get<Notificationobjects[]>(`${this.apiUrl}${loggedInUserId}`)
  }
  connectToWebSocket(): Observable<void> {
    const recipientId = this.authService.getLoggedInUserId();
    console.log('Attempting to connect with recipientId:', recipientId); // Log the recipientId
    if (recipientId) {
      localStorage.setItem('recipientId', recipientId);
      this.socket.ioSocket.io.opts.query = { recipientId };
      this.socket.ioSocket.io.opts.reconnectionAttempts = 10;
      this.socket.ioSocket.io.opts.reconnectionDelay = 1000;
      this.socket.ioSocket.io.opts.reconnectionDelayMax = 5000;
      // Disconnect and then connect to ensure the new options are applied
      this.socket.disconnect();
      this.socket.connect()
      console.log("socket connected successfully at user " + recipientId);
      const connectHandler = (handler: () => void) => this.socket.on('connect', handler);
      const disconnectHandler = (handler: () => void) => this.socket.removeListener('connect', handler);
      return fromEventPattern(connectHandler, disconnectHandler);
    } else {
      console.log('Cannot connect to WebSocket: recipientId is null');
      return EMPTY;
    }
  }
}
