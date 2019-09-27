import { Component, OnInit, Inject, Input, Output, EventEmitter, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ChartConfiguration } from 'c3';

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorComponent implements OnInit {
  @Input() view;
  @Output() update = new EventEmitter();
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
  private data;
  public chartData;
  @Input() chartInputData = this.chartData;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) data) {
    if (this.view !== 'sidenav') {
      this.view = 'dialog';
      this.data = data;
    } else {
      this.data = this.chartInputData.data.json;
    }
    if (this.data) {
      this.columns = this.getKeys(data[0]);
      this.xAxis = this.columns[0];
      this.yAxis = [this.columns[3]];
      this.chartData = this.updateChartData(this.selectedChartType);
    }
  }

  ngOnInit() {
    if (this.view === 'sidenav') {
      this.data = this.chartInputData.data.json;
      this.columns = this.getKeys(this.data[0]);
      this.xAxis = this.chartInputData.data.keys.x;
      this.yAxis = this.chartInputData.data.keys.value;
      this.chartData = this.updateChartData(this.chartInputData.data.type);
    }
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
    this.update.emit(updatedChartData);
    return updatedChartData;
  }

}
