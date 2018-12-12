import {Report} from "../reports";
import {Operation, OperationType} from "./operation";
import {Account} from "../accounts/account";

export class DepositOperation implements Operation {
    type = OperationType.DepositOperation;
    amount: number;
    target: Account;
    description: string;


    constructor(amount: number, targetAccount: Account) {
        this.amount = amount;
        this.target = targetAccount;
        this.description = `${this.type} of ${this.amount} to account ${this.target.getId()}`
    }

    isPossible(): boolean {
        return true;
    }

    makeOperationScenario() {
        this.executionDate = new Date();
        this.target.add(this);
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