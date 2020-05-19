import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportsData, Report } from './reports-list-model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public expandableSymbol = '__level__';
  constructor(private _http: HttpClient) { }

  getReportsList(): Observable<ReportsData> {
    const reportsServiceApi = `assets/reports-list.json`;
    return this._http.get<ReportsData>(reportsServiceApi);
  }

  getReportData(reportId: number): Observable<Report> {
    const reportApi = `assets/report${reportId}.json`;
    return this._http.get<Report>(reportApi);
  }

  getAggregatedTable(tableData: object[], rowFieldKeys: string[], valueFieldKeys: string[], columnFieldKeys: string[]) {
    const aggregatedData = [];
    return new Promise((resolve, reject) => {
      try {
        if (rowFieldKeys.length > 0) {
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
                  let dataRows = {};
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
                      dataRows[valueFieldKey] = filData.reduce((res, item) => ({
                        [valueFieldKey]: +res[valueFieldKey] + +item[valueFieldKey]
                      }))[valueFieldKey];
                      columnFieldKeys.forEach((column) => {
                        const columnFieldValueObject = filData.reduce((res, item) => ({
                          ...res,
                          [item[column] + valueFieldKey]: (res[item[column] + valueFieldKey] ? +res[item[column] + valueFieldKey] + +item[valueFieldKey] : +item[valueFieldKey])
                        }), {});
                        dataRows = { ...dataRows, ...columnFieldValueObject };
                      });
                    }
                    dataRows['__isHidden__'] = false;
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
                let dataRow = {};
                if (dataRowFiltered.length > 0) {
                  dataRow['label'] = rowFieldValue;
                  for (let k = 0; k < valueFieldKeys.length; k++) {
                    const valueFieldKey = valueFieldKeys[k];
                    dataRow[valueFieldKey] = dataRowFiltered.reduce((res, item) => ({
                      [valueFieldKey]: +res[valueFieldKey] + +item[valueFieldKey]
                    }))[valueFieldKey];
                    columnFieldKeys.forEach((column) => {
                      const columnFieldValueObject = dataRowFiltered.reduce((res, item) => ({
                        ...res,
                        [item[column] + valueFieldKey]: res[item[column] + valueFieldKey] ? +res[item[column] + valueFieldKey] + +item[valueFieldKey] : +item[valueFieldKey]
                      }), {});
                      dataRow = { ...dataRow, ...columnFieldValueObject };
                    });
                  }
                  const sym1 = '__level__';
                  dataRow[sym1] = indexPtr;
                  dataRow['__isHidden__'] = false;
                  dataRow['__endIndex__'] = aggregatedData.length;
                  dataRow['__expanded__'] = true;
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
        } else if (valueFieldKeys.length > 0) {
          let dataRow = {};
          valueFieldKeys.forEach(valueFieldKey => {
            dataRow[valueFieldKey] = tableData.reduce((res, item) => ({
              [valueFieldKey]: +res[valueFieldKey] + +item[valueFieldKey]
            }))[valueFieldKey];
            columnFieldKeys.forEach((column) => {
              const columnFieldValueObject = tableData.reduce((res, item) => ({
                ...res,
                [item[column] + valueFieldKey]: res[item[column] + valueFieldKey] ? +res[item[column] + valueFieldKey] + +item[valueFieldKey] : +item[valueFieldKey]
              }), {});
              dataRow = { ...dataRow, ...columnFieldValueObject };
            });
            dataRow['__isHidden__'] = false;
          });
          aggregatedData.push(dataRow);
        }
        this.generateExpansionMapping(aggregatedData).then(res => {
          console.log('New data', aggregatedData);
          resolve(res);
        })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  generateExpansionMapping(pivotData) {
    const openLevels = [];
    return new Promise((resolve, reject) => {
      try {
        openLevels[0] = {
          level: pivotData[0][this.expandableSymbol],
          startRowNumber: 0
        };
        let lastOpenLevel = openLevels[openLevels.length - 1];
        for (let i = 1; i < pivotData.length; i++) {
          const curRow = pivotData[i];
          if (this.expandableSymbol in curRow) {
            pivotData[lastOpenLevel.startRowNumber]['__endIndex__'] = i - 1;
            if (curRow[this.expandableSymbol] < lastOpenLevel.level) {
              openLevels.pop();
              lastOpenLevel = openLevels[openLevels.length - 1];
              pivotData[lastOpenLevel.startRowNumber]['__endIndex__'] = i - 1;
              openLevels.pop();
            } else if (curRow[this.expandableSymbol] === lastOpenLevel.level) {
              openLevels.pop();
            }
            openLevels.push({ level: curRow[this.expandableSymbol], startRowNumber: i });
            lastOpenLevel = openLevels[openLevels.length - 1];
          } else {
            continue;
          }
        }
        while (openLevels.length > 0) {
          pivotData[lastOpenLevel.startRowNumber]['__endIndex__'] = pivotData.length - 1;
          openLevels.pop();
          lastOpenLevel = openLevels[openLevels.length - 1];
        }
        resolve(pivotData);
      } catch (error) {
        reject(error);
      }
    });
  }
}

