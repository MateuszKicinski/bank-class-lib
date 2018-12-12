import {OperationType} from "../../model/operations/operation";
import {TestAccount} from "./deposit.spec";
import {IBAIncomingOperation} from "../../model/operations/iba-in";
import {IBATransfer, InterBankAgency} from "../../model/iba/InterBankAgency";
import {Bank} from "../../model/bank";
import chai = require('chai');

const expect = chai.expect;

export class TestAgency extends InterBankAgency {
    isIdFree() {
        return true;
    }
}

describe('IBA Incoming Operation tests', () => {
    describe('create', () => {
        const testAccount = new TestAccount();
        const bank = new Bank('Bank 1', 1, new TestAgency());
        bank.openAccount(testAccount);
        const transaction = new IBATransfer(100, null, null, 1, 0);
        it('should create correct IBAIncomingOperation ', () => {
            const ibaIncomingOperation = new IBAIncomingOperation(bank, transaction);
            expect(ibaIncomingOperation).to.have.property('type').equal(OperationType.IBAIncomingOperation);
            expect(ibaIncomingOperation).to.have.property('amount').equal(100);
            expect(ibaIncomingOperation).to.have.property('bank').equal(bank);
            expect(ibaIncomingOperation).to.have.property('transaction').equal(transaction);
            expect(ibaIncomingOperation).to.have.property('description').equal(`IBA Incoming of 100 from bank null to account 0`);
        });
    });

    describe('make - success', () => {
        const testAccount = new TestAccount();
        testAccount.balance = 0;
        const bank = new Bank('Bank 1', 1, new TestAgency());
        bank.openAccount(testAccount);
        const transaction = new IBATransfer(100, null, null, 1, 0);
        it('should make icoming IBA operation', () => {
            const incomingIBA = new IBAIncomingOperation(bank, transaction);
            incomingIBA.make();
            expect(testAccount.availableFunds()).equal(100);
        });
    });

    describe('make - fail', () => {
        const testAccount = new TestAccount();
        const bank = new Bank('Bank 1', 1, new TestAgency());
        bank.openAccount(testAccount);
        const transaction = new IBATransfer(100, null, null, 1, 15);
        it('should fail on incoming IBA operation', () => {
            const incomingIBA = new IBAIncomingOperation(bank, transaction);
            expect(() => {
                incomingIBA.make();
            }).to.throw();
        });
    });
});