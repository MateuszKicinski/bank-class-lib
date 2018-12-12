import {Account} from "./account";
import {Operation} from "../operations/operation";
import {IdGenerator} from "../utils";
import {Report} from "../reports";

export abstract class LinkedAccount implements Account {
    private id: number;
    private owner: string;
    protected active: boolean;
    protected balance: number;
    private history: Operation[];

    abstract close();

    constructor() {
        this.id = IdGenerator.generateId();
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