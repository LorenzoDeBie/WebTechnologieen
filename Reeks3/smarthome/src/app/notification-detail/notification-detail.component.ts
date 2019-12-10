import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../notification.service';
import {NotificationComponent} from '../notification/notification.component';
import {Notification} from '../notification';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {
  private notification: Notification = undefined;

  constructor(private route: ActivatedRoute, private notificationService: NotificationService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.notificationService.getNotificationById(id).then((notification) => {
        this.notification = notification;
      }
    );
  }

}
