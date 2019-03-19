import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorComponent implements OnInit {
  public chartTypes = [
    'line',
    'bar',
    'pie',
    'scatter',
    'stacked-bar'
  ];
  public selectedChartType = 'line';
  public dummyLineChart;
  public dummyBarChart;
  public dummyPieChart;
  public dummyScatterChart;
  public dummyStackedBarChart;
  public xAxis = '';
  public yAxis = [''];
  public columns = [];
  public chartData;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log('Data ', data);
    this.columns = this.getKeys(data[0]);
    this.xAxis = this.columns[0];
    this.yAxis = [this.columns[1], this.columns[2]];
    this.chartData = this.updateChartData(this.selectedChartType);
  }

  ngOnInit() {
  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  updateChartData(chartType: string) {
    const updatedChartData = {
      data: {
        json: this.data,
        keys: {
          x: this.xAxis,
          value: this.yAxis
        },
        type: chartType
      },
      axis: {
        x: {
          type: 'category'
        }
      }
    };
    this.chartData = updatedChartData;
    return updatedChartData;
  }

}
