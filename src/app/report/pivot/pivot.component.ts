import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {
  @Input() public pivotData: any;
  public columns = [];
  public filters = [];
  public selectedFilters = [];
  constructor(private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.columns = Object.keys(this.pivotData.data[0]);
    this.filters = [...new Set(this.pivotData._data.map(item => item[this.pivotData.filters[0]]))];
    console.log(this.filters);
  }

  updateTableData() {
    const filteredTable = this.pivotData._data.filter(item => this.selectedFilters.includes(item[this.pivotData.filters[0]]));
    this.pivotData.data = this.reportsService.getAggregatedTable(filteredTable, this.pivotData.rows, this.pivotData.values);
  }

}
