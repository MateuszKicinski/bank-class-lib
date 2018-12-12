import {Interest} from "../interest";
import {LinkedAccount, LinkedAccountOperation} from "./linked-account";
import {Account} from "./account";
import {Report, ReportType} from "../reports";
import {TransferOperation} from "../operations/transfer";

export class DepositAccount extends LinkedAccount {
    constructor(days: number, amount: number, interest: Interest, parentAccount: Account, id: number, owner: string) {
        super(id, owner);
        this.parentAccount = parentAccount;
        this.active = true;
        this.endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
        this.initialAmount = amount;
        this.interest = interest;
        new TransferOperation(this.parentAccount, this, amount).make();
    }

    parentAccount: Account;
    endDate: Date;
    interest: Interest;
    initialAmount: number;
    balance: number = 0;


    close() {
        this.active = false;
        let repayAmount = 0;
        if (Date.now() > this.endDate.getTime()) {
            repayAmount = this.initialAmount + this.interest.calculate()
        } else {
            repayAmount = this.initialAmount;
        }
        new LinkedAccountOperation(this, this.parentAccount, repayAmount).make();
    }

    generateReport(): Report {
        return undefined;
    }
}

export class DepositAccountReport implements Report {
    reportType: ReportType.DepositReport;

}