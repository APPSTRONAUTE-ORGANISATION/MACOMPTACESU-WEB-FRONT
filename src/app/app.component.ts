import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification'; // Import NzNotificationService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected styleUrl to styleUrls
})
export class AppComponent {
  title = 'myapp';
  onlineEvent: Observable<Event> | undefined;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage!: string;
  connectionStatus!: string;

  constructor(private notification: NzNotificationService) { } // Inject NzNotificationService

  ngOnInit(): void {
    /**
    * Get the online/offline status from the browser window
    */
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    /**
    * Get the online status as an observable
    */
    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.connectionStatusMessage = 'Back to online';
        this.connectionStatus = 'online';
        this.notification.success('Connection Status', this.connectionStatusMessage, { nzClass: 'bg-[#f6ffed]' }); // Show success notification
      })
    );

    /**
    * Get the offline status as an observable
    */
    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.connectionStatusMessage = 'Connection lost! You are not connected to the internet';
        this.connectionStatus = 'offline';
        this.notification.error('Connection Status', this.connectionStatusMessage, { nzClass: 'bg-[#ff7875db]' }); // Show error notification
      })
    );
  }

  ngOnDestroy(): void {
    /**
    * Unsubscribe from all subscriptions to avoid memory leaks
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
