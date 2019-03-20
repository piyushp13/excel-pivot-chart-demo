import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {
  @Input() pivotData: any;
  constructor() { }

  ngOnInit() {
  }

}
