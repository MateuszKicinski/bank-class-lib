import {Interest} from "../interest";
import {Account, LinkedAccount} from "./account";

export class LoanAccount implements LinkedAccount {
    id: number;
    creditAmount: number;
    parentAccount: Account;
    interest: Interest;

    constructor(amount: number, interest: Interest, parentAccount: Account) {
        this.parentAccount = parentAccount;
        this.parentAccount.add(amount);
        this.creditAmount = amount;
        this.interest = interest;
    }

    active: boolean;

    close() {
        const repayAmount = this.creditAmount + this.interest.calculate();
        if (this.parentAccount.checkBalance() > repayAmount) {
            this.parentAccount.subtract(repayAmount);
            this.active = false;
        }
    }
}