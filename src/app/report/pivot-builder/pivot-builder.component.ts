import { Component, OnInit, Inject, Input, Optional, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ReportsService } from '../reports.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pivot-builder',
  templateUrl: './pivot-builder.component.html',
  styleUrls: ['./pivot-builder.component.scss']
})
export class PivotBuilderComponent implements OnInit {
  @Input() view;
  public columns = [];
  public tableData = [];
  public selectedFilters = [];
  public selectedRows = [];
  public selectedColumns = [];
  public selectedValues = [];
  @Input() public pivotData = {
    data: this.tableData,
    rows: this.selectedRows,
    columns: this.selectedColumns,
    values: this.selectedValues,
    filters: this.selectedFilters,
    _data: []
  };
  @Output() update = new EventEmitter();
  private data;
  constructor(private reportsService: ReportsService,
    @Optional() @Inject(MAT_DIALOG_DATA) data) {
    if (this.view !== 'sidenav') {
      this.view = 'dialog';
      this.data = data;
      if (this.data) {
        this.columns = Object.keys(this.data[0]);
      }
    } else {
      this.data = this.pivotData._data;
      this.selectedFilters = this.pivotData.filters;
      this.selectedColumns = this.pivotData.columns;
      this.selectedRows = this.pivotData.rows;
      this.selectedValues = this.pivotData.values;
      this.tableData = this.pivotData.data;
    }
  }

  ngOnInit() {
    if (this.view === 'sidenav') {
      this.data = this.pivotData._data;
      this.selectedFilters = this.pivotData.filters;
      this.selectedColumns = this.pivotData.columns;
      this.selectedRows = this.pivotData.rows;
      this.selectedValues = this.pivotData.values;
      this.tableData = this.pivotData.data;
      this.columns = Object.keys(this.data[0]);
    }
  }

  updateTableData() {
    this.reportsService.getAggregatedTable(this.data, this.selectedRows, this.selectedValues)
      .then((res: []) => {
        this.tableData = res;
        this.pivotData = {
          data: this.tableData,
          rows: this.selectedRows,
          columns: this.selectedColumns,
          values: this.selectedValues,
          filters: this.selectedFilters,
          _data: this.data
        };
        this.update.emit(this.pivotData);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedRows, event.previousIndex, event.currentIndex);
    this.updateTableData();
  }

  removeRow(row: string) {
    // this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
    this.selectedRows = this.selectedRows.filter(item => item !== row);
    this.updateTableData();
  }

}
