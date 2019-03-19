import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-cont',
  templateUrl: './table-cont.component.html',
  styleUrls: ['./table-cont.component.scss']
})
export class TableContComponent implements OnInit {
  @Input() tableData: any[];
  @Input() columns: string[];
  @Input() tableRowIdentifier: string | number;
  @Output() clicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleClick(tableRowIdentifier) {
    this.clicked.emit(tableRowIdentifier);
  }

}
