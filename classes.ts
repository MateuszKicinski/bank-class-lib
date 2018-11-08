import {TSMap} from "typescript-map";

abstract class MoneyOperation {
    wasExecuted: boolean;

    abstract executeAction(): boolean;

    execute() {
        if (this.wasExecuted) {
            this.wasExecuted = true;
            return this.executeAction();
        }
        throw 'Operation was already executed';
    }
}

export class History {
    private pastOperations: MoneyOperation[];

    recordOperation(operation: MoneyOperation) {
        this.pastOperations.push(operation);
    }
}

class Customer {
    private id: number;
    private name: string;
    private accounts: TSMap<number, Account>;

    createAccount(): number {
        const accountId = this.accounts.keys()[this.accounts.keys().length - 1] + 1;
        this.accounts.set(accountId, new Account(accountId, this.id));
        return accountId;
    }

    closeAccount(accountId: number) {
        this.accounts.delete(accountId)
    }
}

export class Account extends History {
    private id: number;
    private customerId: number;
    private balance: number;

    constructor(id: number, customerId: number) {
        super();
        this.id = id;
        this.customerId = customerId;
        this.balance = 0;
    }

    currentBalance(): number {
        return this.balance;
    }

    add(amount: number) {
        this.balance += amount;
    }

    subtract(amount: number) {
        this.balance -= amount;
    }
}

export class MoneyPayment implements MoneyOperation {
    source: Account;
    target: Account;
    amount: number;

    constructor(sourceAccount: Account, targetAccount: Account, amount: number) {
        this.source = sourceAccount;
        this.target = targetAccount;
        this.amount = amount;
    }

    executeAction(): boolean {
        const initialSum = this.source.currentBalance() + this.target.currentBalance();
        this.source.subtract(this.amount);
        this.target.add(this.amount);
        if (this.source.currentBalance() < 0) {
            this.source.add(this.amount);
            this.target.subtract(this.amount);
            return false;
        }
        return true;
    }

    wasExecuted: boolean;

    execute(): boolean {
        return undefined;
    }
}

export class MoneyWithdraw {

}