import { Injectable } from '@angular/core';
import { Notification } from './notification';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestNotifications} from './rest-notifications';
import {find, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private link = 'http://www.mocky.io/v2/5be453402f00002c00d9f48f';

  constructor(private http: HttpClient) { }

  getAllNotifications = (): Observable<Notification[]> => {
    // link gives a json object which contains the array of Notifications (which is stupid but okay)
    // map will just get the array out of the object
    return this.http.get<RestNotifications>(this.link).pipe(
      map(items => items.notifications)
    );
  }

  getNotificationById = (id: number): Promise<Notification> => {
    return this.getAllNotifications().pipe(
      map(notifications => notifications.find(notification => notification.id === id))
    ).toPromise();
  }

}
