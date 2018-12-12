import {Interest} from "../interest";
import {IdGenerator} from "../utils";
import {Account} from "./account";
import {LinkedAccount} from "./linked-account";

export class DepositAccount implements LinkedAccount {
    constructor(days: number, amount: number, interest: Interest, parentAccount: Account) {
        this.parentAccount.subtract(amount);
        this.active = true;
        this.depositDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
        this.id = IdGenerator.generateId();
        this.initialAmount = amount;
        this.interest = interest;
    }

    parentAccount: Account;
    depositDate: Date;
    interest: Interest;
    initialAmount: number;


    close() {
        this.active = false;
        if (Date.now() > this.depositDate.getTime()) {
            return this.initialAmount + this.interest.calculate()
        } else {
            return this.initialAmount;
        }
    }

    id: number;
    active: boolean;
}