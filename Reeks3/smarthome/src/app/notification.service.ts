import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';
import {RestResponse} from './rest-response';

@Injectable()
export class NotificationService {
  url = 'http://www.mocky.io/v2/5be453402f00002c00d9f48f';

  constructor(private http: HttpClient) { }

  get notifications(): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.url);
  }

  notificationById(id: number): Promise<Notification> {
    return new Promise<Notification>((resolve, reject) => {
      let notifications;
      this.notifications.subscribe(response => {
        notifications = response.notifications
      }, error => reject(error), () => {
        for(let not of notifications) {
          if(not.id === id) {
            resolve(not);
          }
        }
      });
    });
  }
}
