import {ExtenedAccount} from "../accounts/extended-account";
import {Report} from "../reports";
import {Operation, OperationType} from "./operation";
import {Account} from "../accounts/account";

export class WithdrawOperation implements Operation {
    type = OperationType.Withdraw;
    amount: number;
    source: Account;
    description: string;


    constructor(amount: number, sourceAccount: Account) {
        this.amount = amount;
        this.source = sourceAccount;
        this.description = `${this.type} of ${this.amount} to account ${this.source.getId()}`
    }

    isPossible(): boolean {
        return this.source.availableFunds() >= this.amount;
    }

    makeOperationScenario() {
        this.executionDate = new Date();
        this.source.subtract(this);
    }

    executionDate: Date;

    details(): string {
        return "";
    }

    public make() {
        if (this.isPossible()) {
            this.executionDate = new Date();
            this.makeOperationScenario();
        } else {
            throw new Error('Operation cannot be made!');
        }
    };

    toReport(): Report {
        return undefined;
    }

    generateReport(): Report {
        return undefined;
    }
}