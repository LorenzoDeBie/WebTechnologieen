import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-gauge',
  templateUrl: './temperature-gauge.component.html',
  styleUrls: ['./temperature-gauge.component.css']
})
export class TemperatureGaugeComponent implements OnInit {

  title: string;
  temperature = 23;

  constructor() { }

  ngOnInit() {
  }

}
