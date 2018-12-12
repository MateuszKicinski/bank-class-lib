import {OperationType} from "../../../src/model/operations/operation";
import {TestAccount} from "./deposit.spec";
import chai = require('chai');
import {WithdrawOperation} from "../../../src/model/operations/withdraw";

const expect = chai.expect;

describe('withdraw operation tests', () => {
    describe('create', () => {
        const testAccount = new TestAccount();
        it('should create withdraw operation', () => {
            const deposit = new WithdrawOperation(100, testAccount);
            expect(deposit).to.have.property('type').equal(OperationType.Withdraw);
            expect(deposit).to.have.property('amount').equal(100);
            expect(deposit).to.have.property('source').equal(testAccount);
            expect(deposit).to.have.property('description').equal(`Withdraw of 100 to account 0`);
        });
    });

    describe('make - success', () => {
        const testAccount = new TestAccount();
        testAccount.balance = 100;
        it('should make withdraw operation', () => {
            const deposit = new WithdrawOperation(100, testAccount);
            deposit.make();
            expect(testAccount.availableFunds()).equal(0);
        });
    });

    describe('make - fail', () => {
        const testAccount = new TestAccount();
        testAccount.balance = 0;
        it('should make withdraw operation', () => {
            const deposit = new WithdrawOperation(100, testAccount);
            expect(()=>{
                deposit.make();
            }).to.throw();
        });
    });
});