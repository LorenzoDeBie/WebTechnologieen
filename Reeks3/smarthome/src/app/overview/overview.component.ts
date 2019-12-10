import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification.service';
import {Notification} from '../notification';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
  }

  n = 5;


  ngOnInit() {
    this.notificationService.getAllNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  showMore = () => {
    this.n += 5;
    if (this.n > this.notifications.length) {
      this.n = this.notifications.length;
    }
  }
}
