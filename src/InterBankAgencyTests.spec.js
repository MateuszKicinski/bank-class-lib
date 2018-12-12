"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterBankAgency_1 = require("./InterBankAgency");
var classes_1 = require("./classes");
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
        bank1 = new classes_1.MyBank('Account 1', 1, agency);
        bank2 = new classes_1.MyBank('Account 2', 2, agency);
        account1 = new classes_1.Account(1, 1);
        account2 = new classes_1.Account(2, 2);
        bank1.accounts.push(account1);
        bank2.accounts.push(account2);
    });
    it('should throw error when creating bank with already existing id', function () {
        var error;
        var bank;
        try {
            bank = new classes_1.MyBank('Account 1', 1, agency);
        }
        catch (e) {
            error = e;
        }
        expect(error).to.deep.equal('Account with id: 1 already exists');
        expect(bank).to.equal(undefined);
    });
    it('should create bank 2', function () {
        var bank = new classes_1.MyBank('Account 3', 3, agency);
        expect(bank).to.have.property('name').to.equal('Account 3');
        expect(bank).to.have.property('id').to.equal(3);
    });
    it('should transfer amount between two banks', function () {
        var ibaTransfer = new InterBankAgency_1.IBATransfer(100, 1, 1, 2, 2);
        bank1.makeTransaction(ibaTransfer);
        expect(account2.currentBalance()).to.equal(100);
    });
});
