import {Account} from "../accounts/account";
import {Report} from "../reports";
import {Operation, OperationType} from "./operation";

export class TransferOperation implements Operation {
    amount: number;
    description: string;
    executionDate: Date;
    type = OperationType.TransferOperation;
    source: Account;
    target: Account;

    constructor(source: Account, target: Account, amount: number) {
        this.source = source;
        this.target = target;
        this.amount = amount;
        this.description = `${this.type} of ${this.amount} from account ${this.source.getId()} to account ${this.target.getId()}`
    }


    details(): string {
        return "";
    }

    isPossible(): boolean {
        return this.source.availableFunds() >= this.amount;
    }


    makeOperationScenario() {
        this.source.subtract(this);
        this.target.add(this);
    }

    toReport(): Report {
        return undefined;
    }

    generateReport(): Report {
        return undefined;
    }

    make() {
        if (this.isPossible()) {
            this.executionDate = new Date();
            this.makeOperationScenario();
        } else {
            throw new Error('Operation cannot be made!');
        }
    };
}