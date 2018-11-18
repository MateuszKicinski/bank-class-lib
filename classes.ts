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

export class Account extends History implements Deposit, Withdraw, Transfer {
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

    deposit(amount: number) {
        this.balance += amount;
    }

    withdraw(amount: number) {
        this.balance -= amount;
    }

    transfer(targetAccount, amount: number) {
        this.balance -= amount;
        targetAccount.transferTo(amount);
    };

    transferTo(amount: number) {
        this.balance += amount;
    }

}

export interface Deposit {
    deposit(amount: number);
}

export interface Withdraw {
    withdraw(amount: number);
}

export interface Transfer {
    transfer(targetAccount, amount: number);

    transferTo(amount);
}

export class DepositAccount extends Account {
    interestCalculator: InterestCalculator;
    openingDate: Date;
    closingDate: Date;

    constructor(accountId: number, clientId: number, interestCalculator: InterestCalculator, closingDate: Date, amount: number) {
        super(accountId, clientId);
        this.deposit(amount);
        this.openingDate = new Date();
        this.closingDate = closingDate;
        this.interestCalculator = interestCalculator;
    }

    close() {
        if (new Date() < this.closingDate) {
            return this.currentBalance();
        }
        const interest = this.interestCalculator.calculate(this.currentBalance(), this.openingDate, this.closingDate);
        return this.currentBalance() + interest;
    }
}

export class LoanAccount extends Account {
    openingDate: Date;
    closingDate: Date;
    loanAmount: number;
    interest: number;
    private wasMoneyCollected: boolean;

    constructor(accountId: number, clientId: number, interestCalculator: InterestCalculator, closingDate: Date, amount: number) {
        super(accountId, clientId);
        this.loanAmount = amount;
        this.deposit(amount);
        this.openingDate = new Date();
        this.closingDate = closingDate;
        this.interest = interestCalculator.calculate(this.loanAmount, this.openingDate, this.closingDate);
    }

    get(): number | void {
        if (!this.wasMoneyCollected) {
            this.withdraw(this.loanAmount);
            this.wasMoneyCollected = true;
            return this.loanAmount;
        }
    }

    repayAmount() {
        return this.loanAmount + this.interest;
    }

    repay(amount: number): boolean {
        this.deposit(amount);
        return this.currentBalance() >= this.loanAmount;
    }
}

export interface InterestCalculator {
    calculate(baseAmount: number, openingDate: Date, closingDate: Date): number;
}

export class SimpleCalculator implements InterestCalculator {
    private interestRate: number;
    constructor(interestRate: number){
        this.interestRate = interestRate;
    }
    calculate(baseAmount: number, openingDate: Date, closingDate: Date): number {
        return baseAmount * this.interestRate;
    }
}