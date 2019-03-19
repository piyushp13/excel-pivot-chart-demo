import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportsData } from '../reports-list-model';
import { ReportsService } from '../reports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public reportsData: Observable<ReportsData>;
  public columnsToDisplay = [
    'reportName',
    'modifiedOn',
    'modifiedBy',
    'scheduledBy'];
  public recordIdentifierKey = 'reportId';
  constructor(public reportsService: ReportsService,
    private router: Router) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.reportsData = this.reportsService.getReportsList();
  }

  openReport(reportId: number) {
    this.router.navigate(['report', 'insert', reportId]);
  }

}

