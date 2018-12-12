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
var InterBankAgency_1 = require("./InterBankAgency");
var MoneyOperation = /** @class */ (function () {
    function MoneyOperation() {
    }
    MoneyOperation.prototype.execute = function () {
        if (this.wasExecuted) {
            return this.executeAction();
        }
        throw new Error('Operation was already executed');
    };
    return MoneyOperation;
}());
var Deposit = /** @class */ (function (_super) {
    __extends(Deposit, _super);
    function Deposit(target, amount) {
        var _this = _super.call(this) || this;
        _this.target = target;
        return _this;
    }
    Deposit.prototype.executeAction = function () {
        this.target.balance -= amount;
    };
    return Deposit;
}(MoneyOperation));
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
    Account.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    Account.prototype.withdraw = function (amount) {
        this.balance -= amount;
    };
    Account.prototype.transfer = function (targetAccount, amount) {
        this.balance -= amount;
        targetAccount.transferTo(amount);
    };
    ;
    Account.prototype.transferTo = function (amount) {
        this.balance += amount;
    };
    Account.prototype.getId = function () {
        return this.id;
    };
    return Account;
}(History));
exports.Account = Account;
var DepositAccount = /** @class */ (function (_super) {
    __extends(DepositAccount, _super);
    function DepositAccount(accountId, clientId, interestCalculator, closingDate, amount) {
        var _this = _super.call(this, accountId, clientId) || this;
        _this.deposit(amount);
        _this.openingDate = new Date();
        _this.closingDate = closingDate;
        _this.interestCalculator = interestCalculator;
        return _this;
    }
    DepositAccount.prototype.close = function () {
        if (new Date() < this.closingDate) {
            return this.currentBalance();
        }
        var interest = this.interestCalculator.calculate(this.currentBalance(), this.openingDate, this.closingDate);
        return this.currentBalance() + interest;
    };
    return DepositAccount;
}(Account));
exports.DepositAccount = DepositAccount;
var LoanAccount = /** @class */ (function (_super) {
    __extends(LoanAccount, _super);
    function LoanAccount(accountId, clientId, interestCalculator, closingDate, amount) {
        var _this = _super.call(this, accountId, clientId) || this;
        _this.loanAmount = amount;
        _this.deposit(amount);
        _this.openingDate = new Date();
        _this.closingDate = closingDate;
        _this.interest = interestCalculator.calculate(_this.loanAmount, _this.openingDate, _this.closingDate);
        return _this;
    }
    LoanAccount.prototype.get = function () {
        if (!this.wasMoneyCollected) {
            this.withdraw(this.loanAmount);
            this.wasMoneyCollected = true;
            return this.loanAmount;
        }
    };
    LoanAccount.prototype.repayAmount = function () {
        return this.loanAmount + this.interest;
    };
    LoanAccount.prototype.repay = function (amount) {
        this.deposit(amount);
        return this.currentBalance() >= this.loanAmount;
    };
    return LoanAccount;
}(Account));
exports.LoanAccount = LoanAccount;
var SimpleCalculator = /** @class */ (function () {
    function SimpleCalculator(interestRate) {
        this.interestRate = interestRate;
    }
    SimpleCalculator.prototype.calculate = function (baseAmount, openingDate, closingDate) {
        return baseAmount * this.interestRate;
    };
    return SimpleCalculator;
}());
exports.SimpleCalculator = SimpleCalculator;
var MyBank = /** @class */ (function (_super) {
    __extends(MyBank, _super);
    function MyBank(name, id, agency) {
        var _this = _super.call(this, name, id, agency) || this;
        _this.accounts = [];
        return _this;
    }
    MyBank.prototype.fail = function () {
    };
    MyBank.prototype.receiveTransaction = function (transaction) {
        var targetAccount = this.accounts.filter(function (account) { return account.getId() === transaction.targetClientInfo; })[0];
        targetAccount.deposit(transaction.amount);
    };
    return MyBank;
}(InterBankAgency_1.IBABank));
exports.MyBank = MyBank;
