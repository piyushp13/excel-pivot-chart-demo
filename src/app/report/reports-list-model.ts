export interface ReportsData {
    reportId: number;
    reportName: string;
    modifiedOn: Date;
    modifiedBy: string;
    scheduledBy: string;
}

export interface Report {
    reportId: number;
    pages: ReportSheet[];
}

export interface ReportSheet {
    label: string;
    data: object;
    type: string;
}
