"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
{
}
var History = /** @class */ (function () {
    function History() {
    }
    History.prototype.recordOperation = function (operation) {
        this.pastOperations.push(operation);
    };
    return History;
}());
exports.History = History;
var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.createAccount = function () {
        var accountId = this.accounts.keys()[this.accounts.keys().length - 1] + 1;
        this.accounts.set(accountId, new Account(accountId, this.id));
        return accountId;
    };
    Customer.prototype.closeAccount = function (accountId) {
        this.accounts.delete(accountId);
    };
    return Customer;
}());
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    function Account(id, customerId) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.customerId = customerId;
        _this.balance = 0;
        return _this;
    }
    Account.prototype.currentBalance = function () {
        return this.balance;
    };
    Account.prototype.add = function (amount) {
        this.balance += amount;
    };
    Account.prototype.subtract = function (amount) {
        this.balance -= amount;
    };
    return Account;
}(History));
var MoneyPayment = /** @class */ (function () {
    function MoneyPayment(sourceAccount, targetAccount) {
        this.source = sourceAccount;
        this.target = targetAccount;
    }
    MoneyPayment.prototype.transfer = function (amount) {
        var initialSum = this.sourceAccount.currentBalance() + this.targetAccount.currentBalance();
        this.sourceAccount.subtract(amount);
        this.targetAccount.add(amount);
        if (this.sourceAccount.currentBalance() < 0) {
            this.sourceAccount.add(amount);
            this.targetAccount.subtract(amount);
            return false;
        }
        return true;
    };
    MoneyPayment.prototype.getInfo = function () {
    };
    return MoneyPayment;
}());
exports.MoneyPayment = MoneyPayment;
var MoneyWithdraw = /** @class */ (function () {
    function MoneyWithdraw() {
    }
    return MoneyWithdraw;
}());
exports.MoneyWithdraw = MoneyWithdraw;
(function () {
});
