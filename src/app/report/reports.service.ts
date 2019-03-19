import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportsData, Report } from './reports-list-model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private _http: HttpClient) { }

  getReportsList(): Observable<ReportsData> {
    const reportsServiceApi = `assets/reports-list.json`;
    return this._http.get<ReportsData>(reportsServiceApi);
  }

  getReportData(reportId: number): Observable<Report> {
    const reportApi = `assets/report${reportId}.json`;
    return this._http.get<Report>(reportApi);
  }
}

