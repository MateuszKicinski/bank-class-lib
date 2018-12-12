import {Interest} from "../interest";
import {Operation} from "../operation";
import {IdGenerator} from "../utils";
import {LinkedAccount} from "./linked-account";

export class Account {
    private id: number;
    owner: string;
    dateOfOpening: Date;
    private balance: number;
    interest: Interest;
    historyOfOperations: Operation[];
    linkedAccounts: LinkedAccount[];

    constructor(customerId: number, owner: string) {
        this.id = IdGenerator.generateId();
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
        this.balance -= operation.amount;
    }

    checkBalance() {
        return this.balance;
    }

    getId() {
        return this.id;
    }

    getOwner() {
        return this.owner;
    }

}

export class InsufficientFundsError implements Error {
    message: 'Insufficient funds in the account!';
    name: 'InsufficientFundsError';
    stack: string;

}



