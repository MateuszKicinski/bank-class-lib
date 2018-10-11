import {TSMap} from "typescript-map";

interface MoneyOperation {
    source;
    target;

    getInfo(){
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

class Account extends History {
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

export class MoneyPayment implements MoneyOperation{
    source: Account;
    target: Account | string;

    constructor(sourceAccount: Account, targetAccount: Account) {
        this.source = sourceAccount;
        this.target = targetAccount;
    }

    transfer(amount: number): boolean {
        const initialSum = this.sourceAccount.currentBalance() + this.targetAccount.currentBalance();
        this.sourceAccount.subtract(amount);
        this.targetAccount.add(amount);
        if (this.sourceAccount.currentBalance() < 0) {
            this.sourceAccount.add(amount);
            this.targetAccount.subtract(amount);
            return false;
        }
        return true;
    }



    getInfo() {
    }
}

export class MoneyWithdraw

()
{

}