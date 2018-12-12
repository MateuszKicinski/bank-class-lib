"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterBankAgency = /** @class */ (function () {
    function InterBankAgency() {
        this.banks = [];
    }
    InterBankAgency.prototype.registerBank = function (bank) {
        this.banks.push(bank);
    };
    InterBankAgency.prototype.isIdFree = function (id) {
        return !this.findBank(id);
    };
    InterBankAgency.prototype.findBank = function (id) {
        return this.banks.filter(function (bank) { return bank.getId() === id; })[0];
    };
    return InterBankAgency;
}());
exports.InterBankAgency = InterBankAgency;
var IBABank = /** @class */ (function () {
    function IBABank(name, id, agency) {
        if (agency.isIdFree(id)) {
            this.name = name;
            this.id = id;
            agency.registerBank(this);
            this.agency = agency;
        }
        else {
            throw Error("Bank with id: " + id + " already exists");
        }
    }
    IBABank.prototype.getName = function () {
        return this.name;
    };
    IBABank.prototype.getId = function () {
        return this.id;
    };
    IBABank.prototype.makeTransaction = function (transaction) {
        transaction.makeTransaction(this.agency);
    };
    IBABank.prototype.getAgency = function () {
        return this.agency;
    };
    return IBABank;
}());
exports.IBABank = IBABank;
var IBATransfer = /** @class */ (function () {
    function IBATransfer(amount, sourceBankId, sourceClientInfo, targetBankId, targetClientInfo) {
        this.amount = amount;
        this.sourceBankId = sourceBankId;
        this.sourceClientInfo = sourceClientInfo;
        this.targetBankId = targetBankId;
        this.targetClientInfo = targetClientInfo;
    }
    IBATransfer.prototype.makeTransaction = function (agency) {
        var targetBank = agency.findBank(this.targetBankId);
        var sourceBank = agency.findBank(this.sourceBankId);
        if (!targetBank || !sourceBank) {
            throw Error('Couldn\'t find the bank');
        }
        else {
            targetBank.receiveTransaction(this);
        }
    };
    return IBATransfer;
}());
exports.IBATransfer = IBATransfer;
