import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-pivot-builder',
  templateUrl: './pivot-builder.component.html',
  styleUrls: ['./pivot-builder.component.scss']
})
export class PivotBuilderComponent implements OnInit {
  public columns = [];
  public tableData = [];
  public selectedFilters = [];
  public selectedRows = ['Season', 'Sales rep', 'Product'];
  public selectedColumns = [];
  public selectedValues = ['Units sold'];
  public exportedData = {
    data: this.tableData,
    rows: this.selectedRows,
    columns: this.selectedColumns,
    values: this.selectedValues,
    filters: this.selectedFilters,
    _data: []
  };
  private data;
  constructor(@Inject(MAT_DIALOG_DATA) data,
  private reportsService: ReportsService) {
    this.columns = Object.keys(data[0]);
    this.data = data;
  }

  ngOnInit() {
  }

  updateTableData() {
    this.reportsService.getAggregatedTable(this.data, this.selectedRows, this.selectedValues)
    .then((res: []) => {
      this.tableData = res;
      this.exportedData = {
        data: this.tableData,
        rows: this.selectedRows,
        columns: this.selectedColumns,
        values: this.selectedValues,
        filters: this.selectedFilters,
        _data: this.data
      };
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
  }

}
