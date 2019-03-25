import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ChartConfiguration } from 'c3';

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
    const updatedChartData: ChartConfiguration = {
      data: {
        json: this.data,
        keys: {
          x: this.xAxis,
          value: this.yAxis
        },
        type: chartType,
        groups: []
      },
      axis: {
        x: {
          type: 'category'
        }
      }
    };
    if (this.selectedChartType === 'stacked-bar') {
      updatedChartData.data.type = 'bar';
      updatedChartData.data.groups = [this.yAxis];
    }
    this.chartData = updatedChartData;
    return updatedChartData;
  }

}
