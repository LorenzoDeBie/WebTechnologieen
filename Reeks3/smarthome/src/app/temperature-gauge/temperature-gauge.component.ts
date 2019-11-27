import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-temperature-gauge',
  templateUrl: './temperature-gauge.component.html',
  styleUrls: ['./temperature-gauge.component.css']
})
export class TemperatureGaugeComponent implements OnInit {

  @Input() title: string;

  temperature = 23;
  constructor() { }

  ngOnInit() {
  }

}
