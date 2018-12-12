import {DepositAccount} from "../../../src/model/accounts/deposit-account";
import {Interest} from "../../../src/model/interest";
import {Report} from "../../../src/model/reports";
import {TestAccount} from "../operations/deposit.spec";
import chai = require('chai');
import {LoanAccount} from "../../../src/model/accounts/loan-account";

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

describe('loan account tests', () => {
    describe('create', () => {
        it('should create loan account', () => {
            const parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            const account = new LoanAccount(100, interest, parentAccount, 1, 'Test Deposit Owner');

            expect(account).to.have.property('parentAccount').equal(parentAccount);
            expect(account).to.have.property('balance').equal(0);
            expect(account).to.have.property('interest').equal(interest);
        });
    });

    describe('getters', () => {
        let account;
        before(() => {
            const parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            account = new LoanAccount(100, interest, parentAccount, 1, 'Test Deposit Owner');
        });

        it('should get correct balance', () => {
            expect(account.availableFunds()).to.equal(0);
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

    describe('close', () => {
        let parentAccount;
        let account;
        before(() => {
            parentAccount = new TestAccount();
            parentAccount.balance = 100;
            const interest = new TestInterest();
            account = new LoanAccount(100, interest, parentAccount, 1, 'Test Deposit Owner');
        });

        it('should close loan account when paid with interest', () => {
            account.close();
            expect(account.balance).equal(104);
            expect(account.active).equal(false);
            expect(parentAccount.balance).equal(96);
        });
    });

    describe('dont\'t close', () => {
        let parentAccount;
        let account;
        before(() => {
            parentAccount = new TestAccount();
            parentAccount.balance = 0;
            const interest = new TestInterest();
            account = new LoanAccount(100, interest, parentAccount, 1, 'Test Deposit Owner');
        });

        it('should NOT close loan account when paid without interest', () => {
            account.close();
            expect(account.balance).equal(0);
            expect(account.active).equal(true);
            expect(parentAccount.balance).equal(100);
        });
    });
});