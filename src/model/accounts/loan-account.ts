import {Interest} from "../interest";
import {Account} from "./account";
import {LinkedAccount, LinkedAccountOperation} from "./linked-account";
import {Report, ReportType} from "../reports";
import {TransferOperation} from "../operations/transfer";

export class LoanAccount extends LinkedAccount {
    creditAmount: number;
    parentAccount: Account;
    interest: Interest;

    constructor(amount: number, interest: Interest, parentAccount: Account, id: number, owner: string) {
        super(id, owner);
        this.parentAccount = parentAccount;
        this.creditAmount = amount;
        this.interest = interest;
        this.active = true;
        new LinkedAccountOperation(this, parentAccount,amount).make();
        this.balance = 0;
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

    constructor(loan: LoanAccount) {
        this.loan = loan;
    }

    toString(): string {
        return `Loan - Id: ${this.loan.getId()} | Linked to: ${this.loan.parentAccount.getId()} | Borrowed ${this.loan.creditAmount} on interest ${this.loan.interest}`
    }

}