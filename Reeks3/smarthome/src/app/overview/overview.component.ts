import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  // number of items to show
  n = 5;
  notifications = [];
  showMore: boolean;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications.subscribe(notifications => {
      this.notifications = notifications.notifications;
      this.showMore = this.notifications.length > 0;
    });
  }

  ngOnInit() {

  }

  more() {
    this.n = this.n + 5;
    if (this.n >= this.notifications.length) {
      this.n = this.notifications.length;
      // hide load more button
      this.showMore = false;
    }
  }
}
