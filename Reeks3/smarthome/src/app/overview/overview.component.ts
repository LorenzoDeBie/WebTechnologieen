import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  // number of items to show
  n = 5;

  notifications = [{
    id: 0,
    message: 'Wake up alarm in master bedroom',
    icon: 'fa-clock'
  },
    {
      id: 1,
      message: 'Back door locked',
      icon: 'fa-lock'
    },
    {
      id: 2,
      message: 'Bathroom humidity reaches threshold',
      icon: 'fa-bath'
    },
    {
      id: 3,
      message: 'Sam unlocked front door',
      icon: 'fa-key'
    },
    {
      id: 4,
      message: 'Cloud backup completed',
      icon: 'fa-upload'
    },
    {
      id: 5,
      message: 'Wake up alarm in master bedroom',
      icon: 'fa-clock'
    },
    {
      id: 6,
      message: 'Back door locked',
      icon: 'fa-lock'
    },
    {
      id: 7,
      message: 'Bathroom humidity reaches threshold',
      icon: 'fa-bath'
    },
    {
      id: 8,
      message: 'Sam unlocked front door',
      icon: 'fa-key'
    },
    {
      id: 9,
      message: 'Cloud backup completed',
      icon: 'fa-upload'
    },
    {
      id: 10,
      message: 'Wake up alarm in master bedroom',
      icon: 'fa-clock'
    },
    {
      id: 11,
      message: 'Back door locked',
      icon: 'fa-lock'
    },
    {
      id: 12,
      message: 'Bathroom humidity reaches threshold',
      icon: 'fa-bath'
    },
    {
      id: 13,
      message: 'Sam unlocked front door',
      icon: 'fa-key'
    },
    {
      id: 14,
      message: 'Cloud backup completed',
      icon: 'fa-upload'
    },
    {
      id: 15,
      message: 'Wake up alarm in master bedroom',
      icon: 'fa-clock'
    },
    {
      id: 16,
      message: 'Back door locked',
      icon: 'fa-lock'
    },
    {
      id: 17,
      message: 'Bathroom humidity reaches threshold',
      icon: 'fa-bath'
    },
    {
      id: 18,
      message: 'Sam unlocked front door',
      icon: 'fa-key'
    },
    {
      id: 19,
      message: 'Cloud backup completed',
      icon: 'fa-upload'
    }
  ];

  showMore = (this.notifications.length > 0);

  constructor() { }

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
