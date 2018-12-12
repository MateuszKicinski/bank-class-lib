export interface Reportable {
    generateReport(): Report;
}

export interface Report {
    reportType: ReportType;
    toString(): string;
}

export enum ReportType {
    AccountReport = 'Account Report',
    OperationRepor = 'Operation Report',
    DepositReport = 'Deposit Report',
    LoanReport = 'Loan Report',
    SimpleInterestReport = 'Interest Report',
}

