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
  private filteredKeys = ['__isHidden__', '__expanded__', '__endIndex__', '__level__'];
  public expandableSymbol = '__level__';
  public expansionMapping = [];
  public maxLevel = 0;
  constructor(private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.columns = Object.keys(this.pivotData.data[0]).filter(key => !this.filteredKeys.includes(key));
    this.filters = [...new Set(this.pivotData._data.map(item => item[this.pivotData.filters[0]]))];
    this.maxLevel = this.pivotData.data.map(item => item[this.expandableSymbol]).sort((a, b) => b - a)[0];
  }

  updateTableData() {
    const filteredTable = this.pivotData._data.filter(item => this.selectedFilters.includes(item[this.pivotData.filters[0]]));
    this.reportsService.getAggregatedTable(filteredTable, this.pivotData.rows, this.pivotData.values)
      .then(res => {
        this.pivotData.data = res;
        this.columns = Object.keys(this.pivotData.data[0]).filter(key => !this.filteredKeys.includes(key));
        this.filters = [...new Set(this.pivotData._data.map(item => item[this.pivotData.filters[0]]))];
        this.maxLevel = this.pivotData.data.map(item => item[this.expandableSymbol]).sort((a, b) => b - a)[0];
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }

  updatePivotData(event) {
    this.pivotData = event;
    this.columns = Object.keys(this.pivotData.data[0]).filter(key => !this.filteredKeys.includes(key));
    this.filters = [...new Set(this.pivotData._data.map(item => item[this.pivotData.filters[0]]))];
    this.maxLevel = this.pivotData.data.map(item => item[this.expandableSymbol]).sort((a, b) => b - a)[0];
  }

  toggleRows(rowNumber: number) {
    const targetRow = this.pivotData.data[rowNumber];
    targetRow['__expanded__'] = !targetRow['__expanded__'];
    for (let i = rowNumber + 1; i <= targetRow['__endIndex__']; i++) {
      this.pivotData.data[i]['__isHidden__'] = !targetRow['__expanded__'];
    }
  }

  toggleAllRows() {
    //
  }

}
