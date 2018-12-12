import {Account} from "./account";
import {Operation, OperationType} from "../operations/operation";
import {Report} from "../reports";

export abstract class LinkedAccount implements Account {
    private id: number;
    private owner: string;
    protected active: boolean;
    protected balance: number;
    private history: Operation[] = [];

    abstract close();

    protected constructor(id: number, owner: string) {
        this.owner = owner;
        this.id = id;
    }

    add(operation: Operation) {
        this.balance += operation.amount;
        this.history.push(operation);
    }

    availableFunds() {
        return this.balance;
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
        this.history.push(operation);
        this.balance -= operation.amount;
    }

    abstract generateReport(): Report;

}

export class LinkedAccountOperation extends Operation {
    amount: number;
    description: string;
    type = OperationType.LinkedAccountOperation;
    linked: LinkedAccount;
    parent: Account;

    constructor(linked: LinkedAccount, parent: Account, amount: number) {
        super();
        this.linked = linked;
        this.parent = parent;
        this.amount = amount;
    }

    make() {
        this.linked.subtract(this);
        this.parent.add(this)
    }

}