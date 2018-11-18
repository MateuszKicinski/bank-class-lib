import {Account, DepositAccount, LoanAccount, SimpleCalculator} from './classes';
import chai = require('chai');

const expect = chai.expect;

describe('account tests', () => {
    describe('', () => {
        let account;
        before(() => {
            account = new Account(1, 1);
            account.balance = 300;
        });

        it('should show correct balance of account', () => {
            expect(account.currentBalance()).equal(300);
        });
    });

    describe('', () => {
        let account;
        before(() => {
            account = new Account(2, 1);
        });
        it('should deposit correct amount of money', () => {
            account.deposit(200);
            expect(account.currentBalance()).to.equal(200);
        });
    });

    describe('', () => {
        let account;
        before(() => {
            account = new Account(2, 1);
            account.balance = 150;
        });
        it('should withdraw correct amount of money', () => {
            account.withdraw(100);
            expect(account.currentBalance()).to.equal(50);
        });
    });

    describe('', () => {
        let account1, account2;
        before(() => {
            account1 = new Account(3, 1);
            account2 = new Account(4, 1);
            account1.balance = 100;
        });
        it('should correclty transfer money', () => {
            account1.transfer(account2, 100);
            expect(account1.currentBalance()).to.equal(0);
            expect(account2.currentBalance()).to.equal(100);
        });
    });

    describe('', () => {
        let depositAccount;
        before(() => {
            const simpleCalculator = new SimpleCalculator(0.05);
            depositAccount = new DepositAccount(5, 1, simpleCalculator, new Date(2020, 1), 50);
        });
        it('should return deposit amount withour interest when closed before close date', () => {
            expect(depositAccount.close()).to.equal(50);
        });
    });

    describe('', () => {
        let depositAccount;
        before(() => {
            const simpleCalculator = new SimpleCalculator(0.05);
            depositAccount = new DepositAccount(5, 1, simpleCalculator, new Date(0), 50);
        });
        it('should return deposit amount with interest when closed after close date', () => {
            expect(depositAccount.close()).to.equal(52.5);
        });
    });

    describe('', () => {
        let loanAccount;
        before(() => {
            const simpleCalculator = new SimpleCalculator(0.05);
            loanAccount = new LoanAccount(5, 1, simpleCalculator, new Date(0), 50);
        });
        it('should return correct amount from loan when called for the 1st time', () => {
            expect(loanAccount.get()).to.equal(50);
        });
        describe('', () => {
            it('should return nothing for the 2nd time', () => {
                expect(loanAccount.get()).to.equal();
            });
        });
        describe('', () => {
            it('should return loan amount + interest', () => {
                expect(loanAccount.repayAmount()).to.equal(52.5);
            });
        });
    });

});