import {DepositAccount} from "../../model/accounts/deposit-account";
import {Interest} from "../../model/interest";
import {Report} from "../../model/reports";
import {TestAccount} from "../operations/deposit.spec";
import chai = require('chai');

const expect = chai.expect;

export class TestInterest implements Interest {
    type: null;

    calculate(): number {
        return 4;
    }

    generateReport(): Report {
        return undefined;
    }
}

describe('deposit account tests', () => {
    describe('create', () => {
        it('should create deposit account', () => {
            const parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            const account = new DepositAccount(30, 100, interest, parentAccount, 1, 'Test Deposit Owner');

            expect(account).to.have.property('parentAccount').equal(parentAccount);
            expect(account).to.have.property('endDate');
            expect(account).to.have.property('balance').equal(100);
            expect(account).to.have.property('interest').equal(interest);
        });
    });

    describe('getters', () => {
        let account;
        before(() => {
            const parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            account = new DepositAccount(30, 100, interest, parentAccount, 1, 'Test Deposit Owner');
        });

        it('should get correct balance', () => {
            expect(account.availableFunds()).to.equal(100);
        });

        it('should get correct history', () => {
            expect(account.getHistory()).to.have.length(1);
        });

        it('should get correct owner', () => {
            expect(account.getOwner()).to.equal('Test Deposit Owner');
        });

        it('should get correct id', () => {
            expect(account.getId()).to.equal(1);
        });
    });

    describe('close - with interest', () => {
        let parentAccount;
        let accountInterest;
        before(() => {
            parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            accountInterest = new DepositAccount(-1, 100, interest, parentAccount, 1, 'Test Deposit Owner');
        });

        it('should close deposit account with interest', () => {
            accountInterest.close();
            expect(accountInterest.balance).equal(-4);
            expect(parentAccount.balance).equal(104);
        });
    });

    describe('close - no interest', () => {
        let parentAccount;
        let account;
        before(() => {
            parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            account = new DepositAccount(1, 100, interest, parentAccount, 1, 'Test Deposit Owner');
        });

        it('should close deposit account with interest', () => {
            account.close();
            expect(account.balance).equal(0);
            expect(parentAccount.balance).equal(100);
        });
    });
});