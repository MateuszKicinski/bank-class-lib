"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterBankAgency_1 = require("./model/iba/InterBankAgency");
var bank_1 = require("./model/bank");
var extended_account_1 = require("./model/accounts/extended-account");
var operation_1 = require("./model/operations/operation");
var chai = require("chai");
var expect = chai.expect;
describe('Inter Account Agency', function () {
    var agency;
    var bank1;
    var bank2;
    var account1;
    var account2;
    before(function () {
        agency = new InterBankAgency_1.InterBankAgency();
        bank1 = new bank_1.Bank('Bank 1', 1, agency);
        bank2 = new bank_1.Bank('Bank 2', 2, agency);
        account1 = new extended_account_1.ExtenedAccount('Test Owner 1', 1);
        account2 = new extended_account_1.ExtenedAccount('Test Owner 2', 1);
        new operation_1.DepositOperation(200, account1).make();
        bank1.openAccount(account1);
        bank2.openAccount(account2);
    });
    it('should throw error when creating bank with already existing id', function () {
        expect(function () {
            new bank_1.Bank('Account 1', 1, agency);
        }).to.throw();
    });
    it('should create bank 2', function () {
        var bank = new bank_1.Bank('Account 3', 3, agency);
        expect(bank).to.have.property('name').to.equal('Account 3');
        expect(bank).to.have.property('id').to.equal(3);
    });
    it('should transfer amount between two banks', function () {
        var ibaTransfer = new InterBankAgency_1.IBATransfer(100, 1, 1, 2, 1);
        bank1.makeTransaction(ibaTransfer);
        expect(account2.availableFunds()).to.equal(100);
    });
    it('should fail when target bank id is incorrect', function () {
        expect(function () {
            var ibaTransfer = new InterBankAgency_1.IBATransfer(100, 1, 1, 200, 1);
            bank1.makeTransaction(ibaTransfer);
        }).to.throw();
    });
    it('should fail when source bank id is incorrect', function () {
        expect(function () {
            var ibaTransfer = new InterBankAgency_1.IBATransfer(100, 200, 1, 2, 1);
            bank1.makeTransaction(ibaTransfer);
        }).to.throw();
    });
    it('should fail when target bank client id is incorrect', function () {
        expect(function () {
            var ibaTransfer = new InterBankAgency_1.IBATransfer(100, 1, 1, 2, 100);
            bank1.makeTransaction(ibaTransfer);
        }).to.throw();
    });
});
