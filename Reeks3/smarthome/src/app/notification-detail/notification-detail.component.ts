import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  @Input() id: number;
  notification: Promise<Notification> = undefined;
  constructor(private route: ActivatedRoute, private notificationService: NotificationService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.notification = notificationService.notificationById(this.id);
    this.notification.then(not => console.log(not)).catch(error => console.error(error));
    /*this.notificationService.notificationById(this.id).then(not => {
      this.notification = not;
      console.log("notification: " + this.notification);
    }).catch(error => console.error(error));*/
  }

  ngOnInit() {
  }

}
