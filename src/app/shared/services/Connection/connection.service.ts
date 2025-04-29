import { Injectable, NgZone } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private connectionStatus = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(
    private ngZone: NgZone,
    private notificationsService: NzNotificationService 
  ) {
    this.monitorConnection();
  }

  private monitorConnection() {
    window.addEventListener('online', () => {
      this.ngZone.run(() => this.updateConnectionStatus(true));
    });

    window.addEventListener('offline', () => {
      this.ngZone.run(() => this.updateConnectionStatus(false));
    });
  }

  private updateConnectionStatus(isOnline: boolean) {
    this.connectionStatus.next(isOnline);

    if (isOnline) {
      this.notificationsService.success('Connection Restored', 'You are back online!');
    } else {
      this.notificationsService.error('Connection Lost', 'You are offline!');
    }
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }
}
