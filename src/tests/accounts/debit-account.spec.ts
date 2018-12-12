import {DebitAccount} from "../../model/accounts/debit-account";
import {TestOperation} from "./extended-account.spec";
import chai = require('chai');

const expect = chai.expect;


describe('debit account tests', () => {
    describe('create', () => {

        it('should create debit account', () => {
            const account = new DebitAccount(100, 'Test Debit Owner', 1);
            expect(account).to.have.property('history').deep.equal([]);
            expect(account).to.have.property('debitAmount').equal(100);
            expect(account).to.have.property('balance').equal(0);
            expect(account).to.have.property('owner').equal('Test Debit Owner');
            expect(account).to.have.property('id').equal(1);
        });
    });

    describe('getters', () => {
        let account;
        before(() => {
            account = new DebitAccount(100, 'Test Debit Owner', 1);
        });

        it('should get correct balance', () => {
            expect(account.availableFunds()).to.equal(0);
        });

        it('should get correct history', () => {
            expect(account.getHistory()).to.deep.equal([]);
        });

        it('should get correct debit amount', () => {
            expect(account.getDebitAmount()).to.equal(100);
        });

        it('should get correct owner', () => {
            expect(account.getOwner()).to.equal('Test Debit Owner');
        });

        it('should get correct id', () => {
            expect(account.getId()).to.equal(1);
        });
    });

    describe('add - debit unused', () => {
        let account;
        before(() => {
            account = new DebitAccount(100, 'TestOwner', 1);
            account.balance = 300;
        });

        it('should add correct amount of money to account', () => {
            account.add(new TestOperation(200));
            expect(account.availableFunds()).equal(500);
        });
    });

    describe('add - debit used', () => {
        let account;
        before(() => {
            account = new DebitAccount(100, 'TestOwner', 1);
            account.balance = -50;
        });

        it('should add correct amount of money to account', () => {
            account.add(new TestOperation(200));
            expect(account.availableFunds()).equal(150);
        });
    });

    describe('subtract - success', () => {
        let account;
        before(() => {
            account = new DebitAccount(100, 'TestOwner', 1);
            account.balance = 300;
        });

        it('should subtract correct amount of money from debit account', () => {
            account.subtract(new TestOperation(350));
            expect(account.balance).equal(-50);
        });
    });

    describe('subtract - error', () => {
        let account;
        before(() => {
            account = new DebitAccount(100, 'TestOwner', 1);
            account.balance = 300;
        });

        it('should throw error when trying to subtract more money than debit allows for', () => {
            expect(() => account.subtract(new TestOperation(450))).to.throw()
        });
    });
});