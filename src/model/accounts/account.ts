import {Operation} from "../operations/operation";
import {Report, Reportable, ReportType} from "../reports";

export interface Account extends Reportable {

    add(operation: Operation);

    subtract(operation: Operation);

    availableFunds();

    getId(): number;

    getOwner();

    getHistory();

}

export class InsufficientFundsError implements Error {
    message ='Insufficient funds in the account!';
    name = 'InsufficientFundsError';
    stack: string;

}

export class AccountReport implements Report {
    reportType: ReportType.AccountReport;
    account: Account;

    constructor(account: Account) {
        this.account = account;
    }

    toString(): string {
        let reportString = `${this.reportType}: Id: ${this.account.getId()} | Owner: ${this.account.getOwner()}  | Generated: ${new Date()}`;
        reportString = reportString + `\n History: `;
        for (let operation of this.account.getHistory()) {
            reportString = reportString + '\n' + operation.generateReport().toString();
        }
        return reportString;
    }
}



