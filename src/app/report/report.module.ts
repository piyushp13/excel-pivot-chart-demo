import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { SharedModule } from '../shared/shared.module';
import { InsertComponent } from './insert/insert.component';
import { HomeComponent } from './home/home.component';
import { TableContComponent } from './table-cont/table-cont.component';
import { ChartComponent } from './chart/chart.component';
import { PivotComponent } from './pivot/pivot.component';
import { DrilldownComponent } from './drilldown/drilldown.component';
import { ChartSelectorComponent } from './chart-selector/chart-selector.component';
import { PivotBuilderComponent } from './pivot-builder/pivot-builder.component';

@NgModule({
  declarations: [ReportComponent,
    InsertComponent,
    HomeComponent,
    TableContComponent,
    ChartComponent,
    PivotComponent,
    DrilldownComponent,
    ChartSelectorComponent,
    PivotBuilderComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ChartSelectorComponent,
    PivotBuilderComponent
  ]
})
export class ReportModule { }
