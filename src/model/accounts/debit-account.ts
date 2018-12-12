import {Operation} from "../operations/operation";
import {Report} from "../reports";
import {Account, AccountReport, InsufficientFundsError} from "./account";

export class DebitAccount implements Account {
    private  debitAmount: number;
    private history: Operation[] = [];
    private balance: number;
    private id: number;
    private owner: string;

    constructor(debitAmount: number, owner: string, id: number) {
        this.debitAmount = debitAmount;
        this.balance = 0;
        this.owner = owner;
        this.id = id;
    }

    add(operation: Operation) {
        this.history.push(operation);
        this.balance += operation.amount;
    }

    availableFunds() {
        return this.balance + this.debitAmount;
    }

    getHistory() {
        return this.history;
    }

    getId(): number {
        return this.id;
    }

    getOwner() {
        return this.owner;
    }

    subtract(operation: Operation) {
        if (this.balance - operation.amount < -this.debitAmount) {
            throw InsufficientFundsError;
        }

        this.balance -= operation.amount;
        this.history.push(operation);
    }

    getDebitAmount() {
        return this.debitAmount;
    }

    generateReport(): Report {
        return new AccountReport(this);
    }

}