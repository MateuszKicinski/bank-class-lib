"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("./classes");
var chai = require("chai");
var expect = chai.expect;
describe('account tests', function () {
    describe('', function () {
        var account;
        before(function () {
            account = new classes_1.Account(1, 1);
            account.balance = 300;
        });
        it('should show correct balance of account', function () {
            expect(account.currentBalance()).equal(300);
        });
    });
    describe('', function () {
        var account;
        before(function () {
            account = new classes_1.Account(2, 1);
        });
        it('should deposit correct amount of money', function () {
            account.deposit(200);
            expect(account.currentBalance()).to.equal(200);
        });
    });
    describe('', function () {
        var account;
        before(function () {
            account = new classes_1.Account(2, 1);
            account.balance = 150;
        });
        it('should withdraw correct amount of money', function () {
            account.withdraw(100);
            expect(account.currentBalance()).to.equal(50);
        });
    });
    describe('', function () {
        var account1, account2;
        before(function () {
            account1 = new classes_1.Account(3, 1);
            account2 = new classes_1.Account(4, 1);
            account1.balance = 100;
        });
        it('should correclty transfer money', function () {
            account1.transfer(account2, 100);
            expect(account1.currentBalance()).to.equal(0);
            expect(account2.currentBalance()).to.equal(100);
        });
    });
    describe('', function () {
        var depositAccount;
        before(function () {
            var simpleCalculator = new classes_1.SimpleCalculator(0.05);
            depositAccount = new classes_1.DepositAccount(5, 1, simpleCalculator, new Date(2020, 1), 50);
        });
        it('should return deposit amount withour interest when closed before close date', function () {
            expect(depositAccount.close()).to.equal(50);
        });
    });
    describe('', function () {
        var depositAccount;
        before(function () {
            var simpleCalculator = new classes_1.SimpleCalculator(0.05);
            depositAccount = new classes_1.DepositAccount(5, 1, simpleCalculator, new Date(0), 50);
        });
        it('should return deposit amount with interest when closed after close date', function () {
            expect(depositAccount.close()).to.equal(52.5);
        });
    });
    describe('', function () {
        var loanAccount;
        before(function () {
            var simpleCalculator = new classes_1.SimpleCalculator(0.05);
            loanAccount = new classes_1.LoanAccount(5, 1, simpleCalculator, new Date(0), 50);
        });
        it('should return correct amount from loan when called for the 1st time', function () {
            expect(loanAccount.get()).to.equal(50);
        });
        describe('', function () {
            it('should return nothing for the 2nd time', function () {
                expect(loanAccount.get()).to.equal();
            });
        });
        describe('', function () {
            it('should return loan amount + interest', function () {
                expect(loanAccount.repayAmount()).to.equal(52.5);
            });
        });
    });
});
