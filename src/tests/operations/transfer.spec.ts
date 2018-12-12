import {OperationType} from "../../model/operations/operation";
import {TestAccount} from "./deposit.spec";
import {TransferOperation} from "../../model/operations/transfer";
import chai = require('chai');

const expect = chai.expect;

describe('transfer operation tests', () => {
    describe('create', () => {
        const sourceAccount = new TestAccount();
        const targetAccount = new TestAccount();
        it('should create transfer operation', () => {
            const deposit = new TransferOperation(sourceAccount, targetAccount, 100);
            expect(deposit).to.have.property('type').equal(OperationType.TransferOperation);
            expect(deposit).to.have.property('amount').equal(100);
            expect(deposit).to.have.property('source').equal(sourceAccount);
            expect(deposit).to.have.property('target').equal(targetAccount);
            expect(deposit).to.have.property('description').equal(`Transfer of 100 from account 0 to account 0`);
        });
    });

    describe('make - success', () => {
        const sourceAccount = new TestAccount();
        const targetAccount = new TestAccount();
        sourceAccount.balance = 100;
        targetAccount.balance = 0;
        it('should make transfer operation', () => {
            const transfer = new TransferOperation(sourceAccount, targetAccount, 100);
            transfer.make();
            expect(sourceAccount.availableFunds()).equal(0);
            expect(targetAccount.availableFunds()).equal(100);
        });
    });

    describe('make - fail', () => {
        const sourceAccount = new TestAccount();
        const targetAccount = new TestAccount();
        sourceAccount.balance = 0;
        it('transfer operation should fail', () => {
            const transfer = new TransferOperation(sourceAccount, targetAccount, 100);
            expect(() => {
                transfer.make();
            }).to.throw();
        });
    });
});