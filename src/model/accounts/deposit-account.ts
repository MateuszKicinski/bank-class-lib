import {Interest} from "../interest";
import {LinkedAccount} from "./linked-account";
import {Operation, TransferOperation} from "../operations/operation";
import {Account} from "./account";
import {Report, ReportType} from "../reports";

export class DepositAccount extends LinkedAccount {
    constructor(days: number, operation: Operation, interest: Interest, parentAccount: Account) {
        super();
        this.parentAccount = parentAccount
        this.active = true;
        this.endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
        this.initialAmount = operation.amount;
        this.interest = interest;
    }

    parentAccount: Account;
    endDate: Date;
    interest: Interest;
    initialAmount: number;


    close() {
        this.active = false;
        let repayAmount = 0;
        if (Date.now() > this.endDate.getTime()) {
            repayAmount = this.initialAmount + this.interest.calculate()
        } else {
            repayAmount = this.initialAmount;
        }
        new TransferOperation(this, this.parentAccount, repayAmount);
    }

    generateReport(): Report {
        return undefined;
    }
}

export class DepositAccountReport implements Report {
    reportType: ReportType.DepositReport;

}