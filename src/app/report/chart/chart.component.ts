import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() chartData: c3.ChartConfiguration;
  private chart;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && 'chartData' in changes) {
      if (changes.chartData.currentValue.data.type === 'bar') {
        this.chart = c3.generate(changes.chartData.currentValue);
      } else {
      const changeObject = {...changes.chartData.currentValue.data, unload: true};
      console.log(changeObject);
      this.chart.load(changeObject);
      }
    }
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const config: c3.ChartConfiguration  = this.chartData;
    console.log(config);
    this.chart = c3.generate(config);
    console.log('Chart created');
  }

}


