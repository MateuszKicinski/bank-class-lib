import {Reportable, ReportContent} from "./reportable";
import {Account} from "./accounts/account";

export abstract class Operation implements Reportable {
    executionDate: Date;
    abstract type: OperationType;
    abstract amount: number;
    abstract description: string;

    make() {
        if (this.isPossible()) {
            this.executionDate = new Date();
            this.makeOperationScenario();
        } else {
            throw new Error('Operation cannot be made!');
        }
    };

    abstract makeOperationScenario();

    abstract isPossible(): boolean;


    toReport(): ReportContent {
        return new ReportContent('Operation', this.type, `Details: ${this.details()}`);
    }

    details(): string {
        return `Date: ${this.executionDate} Description: ${this.description}`;
    }
}

export enum OperationType {
    DepositOperation = 'Deposit',
    PaymentOperation = 'Payment'
}

export class DepositOperation implements Operation {
    type = OperationType.DepositOperation;
    amount: number;
    target: Account;
    description: string;


    constructor(amount: number, targetAccount: Account) {
        this.amount = amount;
        this.target = targetAccount;
        this.description = `${this.type} of ${this.amount} to account ${this.target.id}`
    }

    isPossible(): boolean {
        return true;
    }

    makeOperationScenario() {
        this.target.add(this.amount);
    }

    executionDate: Date;

    details(): string {
        return "";
    }

    make(): void {
    }

    toReport(): ReportContent {
        return undefined;
    }
}

export class PaymentOperation implements Operation {
    amount: number;
    description: string;
    executionDate: Date;
    type: OperationType;
    source: Account;
    target: Account;

    constructor(source: Account, target: Account, amount: number) {
        this.source = source;
        this.target = target;
        this.amount = amount;
        this.description = `${this.type} of ${this.amount} fromt account ${this.source.id} to account ${this.target.id}`
    }


    details(): string {
        return "";
    }

    isPossible(): boolean {
        return false;
    }

    make(): void {
    }

    makeOperationScenario() {
    }

    toReport(): ReportContent {
        return undefined;
    }
}

export class OpreationCannotBeMadeError implements Error {
    message: 'Operation cannot be made!';
    name: 'OperationCannotBeMadeError';
    stack: string;
}