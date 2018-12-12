import {Interest} from "../interest";
import {Account, ExtenedAccount} from "./account";
import {Operation, TransferOperation} from "../operations/operation";
import {LinkedAccount} from "./linked-account";
import {Report, ReportType} from "../reports";

export class LoanAccount extends LinkedAccount {
    creditAmount: number;
    parentAccount: Account;
    interest: Interest;

    constructor(operation: Operation, interest: Interest, parentAccount: Account) {
        super();
        this.parentAccount = parentAccount;
        this.creditAmount = operation.amount;
        this.interest = interest;
    }

    active: boolean;

    close() {
        const repayAmount = this.creditAmount + this.interest.calculate();
        if (this.parentAccount.availableFunds() > repayAmount) {
            new TransferOperation(this.parentAccount, this, repayAmount).make();
            this.active = false;
        }
    }

    generateReport(): Report {
        return undefined;
    }
}

export class LoanAccountReport implements Report {
    reportType: ReportType.LoanReport;
    loan: LoanAccount;

    constructor(loan: LoanAccount){
        this.loan = loan;
    }

    toString(): string {
        return `Loan - Id: ${this.loan.getId()} | Linked to: ${this.loan.parentAccount.getId()} | Borrowed ${this.loan.creditAmount} on interest ${this.loan.interest}`
    }

}