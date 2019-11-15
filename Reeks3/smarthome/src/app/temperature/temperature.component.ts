import { Component, OnInit } from '@angular/core';
import {TemperatureGaugeComponent} from '../temperature-gauge/temperature-gauge.component';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  tempGauge = new TemperatureGaugeComponent();
  constructor() { }

  ngOnInit() {
  }

}
