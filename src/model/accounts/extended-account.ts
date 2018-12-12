import {Interest} from "../interest";
import {Operation} from "../operations/operation";
import {LinkedAccount} from "./linked-account";
import {IdGenerator} from "../utils";
import {Report} from "../reports";
import {Account, AccountReport, InsufficientFundsError} from "./account";

export class ExtenedAccount implements Account {
    private balance: number = 0;
    private dateOfOpening: Date;
    private id: number;
    private owner: string;
    private interest: Interest;
    private historyOfOperations: Operation[];
    linkedAccounts: LinkedAccount[];

    constructor(owner: string, id: number) {
        this.id = id;
        this.owner = owner;
        this.dateOfOpening = new Date();
        this.historyOfOperations = [];
    }


    changeInterest(newInterest: Interest) {
        if (this.interest) {
            this.balance += this.interest.calculate();
        }
        this.interest = newInterest;
    }

    add(operation: Operation) {
        this.balance += operation.amount;
        this.historyOfOperations.push(operation);
    }

    subtract(operation: Operation) {
        if (this.balance < operation.amount) {
            throw InsufficientFundsError;
        }
        this.historyOfOperations.push(operation);
        this.balance -= operation.amount;
    }

    availableFunds() {
        return this.balance;
    }

    getId(): number {
        return this.id;
    }

    getOwner() {
        return this.owner;
    }


    getHistory() {
        return this.historyOfOperations;
    }

    generateReport(): Report {
        return new AccountReport(this)
    }

}