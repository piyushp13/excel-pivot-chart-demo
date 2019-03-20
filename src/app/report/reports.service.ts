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

  getAggregatedTable(tableData: object[], rowFieldKeys: string[], valueFieldKeys: string[]) {
    const aggregatedData = [];
    const lastLevel = rowFieldKeys[rowFieldKeys.length - 1];
    const uniqueValsObject = {};
    rowFieldKeys.forEach(rowFieldKey => {
      const values = [...new Set(tableData.map(item => item[rowFieldKey]))];
      uniqueValsObject[rowFieldKey] = {
        index: 0,
        values: values,
        condition: values[0]
      };
    });
    let indexPtr = 0;
    while (true) {
      const itemsLeft = Object.values(uniqueValsObject).map((item: any) => item.values.length - item.index).reduce((p, t) => p + t);
      if (itemsLeft > 0) {
        const rowValueObj = uniqueValsObject[rowFieldKeys[indexPtr]];
        const rowFieldValue = rowValueObj.values[rowValueObj.index];
        rowValueObj.condition = rowValueObj.values[rowValueObj.index];
        if (indexPtr === rowFieldKeys.length - 1) {
          uniqueValsObject[lastLevel].values.forEach(lastLevelValue => {
            const dataRows = {};
            const filData = tableData.filter(item => {
              let condition = true;
              for (let j = 0; j < indexPtr; j++) {
                condition = condition && uniqueValsObject[rowFieldKeys[j]].condition === item[rowFieldKeys[j]];
              }
              return condition && item[lastLevel] === lastLevelValue;
            });
            if (filData.length > 0) {
              dataRows['label'] = lastLevelValue;
              for (let k = 0; k < valueFieldKeys.length; k++) {
                const valueFieldKey = valueFieldKeys[k];
                dataRows[valueFieldKey] = filData.reduce((prev, total) => ({
                  [valueFieldKey]: prev[valueFieldKey] + total[valueFieldKey]
                }))[valueFieldKey];
              }
              aggregatedData.push(dataRows);
            }
          });
          rowValueObj.index = rowValueObj.values.length;
          if (rowFieldKeys.length > 1) {
            rowValueObj.index = 0;
          }
          indexPtr = indexPtr - 1;
          if (indexPtr >= 1) {
            if (uniqueValsObject[rowFieldKeys[indexPtr]].index === uniqueValsObject[rowFieldKeys[indexPtr]].values.length) {
              uniqueValsObject[rowFieldKeys[indexPtr]].index = 0;
              indexPtr = indexPtr - 1;
            }
          }
        } else if (indexPtr < rowFieldKeys.length - 1) {
          const dataRowFiltered = tableData.filter(item => {
            let condition = true;
            for (let j = 0; j < indexPtr; j++) {
              condition = condition && uniqueValsObject[rowFieldKeys[j]].condition === item[rowFieldKeys[j]];
            }
            return condition && item[rowFieldKeys[indexPtr]] === rowFieldValue;
          });
          const dataRow = {};
          if (dataRowFiltered.length > 0) {
            dataRow['label'] = rowFieldValue;
            for (let k = 0; k < valueFieldKeys.length; k++) {
              const valueFieldKey = valueFieldKeys[k];
              dataRow[valueFieldKey] = dataRowFiltered.reduce((prev, total) => ({
                [valueFieldKey]: prev[valueFieldKey] + total[valueFieldKey]
              }))[valueFieldKey];
            }
            const sym1 = Symbol.for('expandable');
            dataRow[sym1] = indexPtr;
            aggregatedData.push(dataRow);
          }
          if (rowValueObj.index >= rowValueObj.values.length && indexPtr !== 0) {
            rowValueObj.index = 0;
          } else {
            rowValueObj.index++;
          }
          indexPtr++;
        } else {
          indexPtr = indexPtr - 1;
        }
      } else {
        break;
      }
    }
    console.log(aggregatedData);
    return aggregatedData;
  }
}

