import {Account} from "../../../src/model/accounts/account";
import {Operation, OperationType} from "../../../src/model/operations/operation";
import {Report} from "../../../src/model/reports";
import {DepositOperation} from "../../../src/model/operations/deposit";
import chai = require('chai');

const expect = chai.expect;

export class TestAccount implements Account {
    balance: number = 0;

    add(operation: Operation) {
        this.balance += operation.amount;
    }

    availableFunds() {
        return this.balance;
    }

    generateReport(): Report {
        return undefined;
    }

    getHistory() {
    }

    getId(): number {
        return 0;
    }

    getOwner() {
    }

    subtract(operation: Operation) {
        this.balance -= operation.amount;
    }
}

describe('deposit operation tests', () => {
    describe('create', () => {
        const testAccount = new TestAccount();
        it('should create deposit operation', () => {
            const deposit = new DepositOperation(100, testAccount);
            expect(deposit).to.have.property('type').equal(OperationType.DepositOperation);
            expect(deposit).to.have.property('amount').equal(100);
            expect(deposit).to.have.property('target').equal(testAccount);
            expect(deposit).to.have.property('description').equal(`Deposit of 100 to account 0`);
        });
    });

    describe('make', () => {
        const testAccount = new TestAccount();
        it('should make deposit operation', () => {
            const deposit = new DepositOperation(100, testAccount);
            deposit.make();
            expect(testAccount.availableFunds()).equal(100);
        });
    });
});
