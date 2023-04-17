import { Component } from '@angular/core';
import { WebSocketService } from './consultor/services/web-socket.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashbord';

}
