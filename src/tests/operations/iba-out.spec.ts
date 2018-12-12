import {OperationType} from "../../model/operations/operation";
import {TestAccount} from "./deposit.spec";
import {IBATransfer, InterBankAgency} from "../../model/iba/InterBankAgency";
import {Bank} from "../../model/bank";
import {IBAOutgoingOperation} from "../../model/operations/iba-out";
import chai = require('chai');
import spies = require('chai-spies');

const expect = chai.expect;
chai.use(spies);

export class TestAgency extends InterBankAgency {

}

describe('IBA Outgoing Operation tests', () => {
    describe('create', () => {
        const sourceAccount = new TestAccount();
        const bank = new Bank('Bank 1', 1, new TestAgency());
        bank.openAccount(sourceAccount);
        const expectedTransaction = new IBATransfer(100, 1, 0, 2, 2);
        it('should create correct IBAIncomingOperation ', () => {
            const outgoingIBA = new IBAOutgoingOperation(bank, sourceAccount, 2, 2, 100);
            expect(outgoingIBA).to.have.property('type').equal(OperationType.IBAOutgoingOperation);
            expect(outgoingIBA).to.have.property('amount').equal(100);
            expect(outgoingIBA).to.have.property('bank').equal(bank);
            expect(outgoingIBA).to.have.property('transaction').deep.equal(expectedTransaction);
            expect(outgoingIBA).to.have.property('sourceAccount').deep.equal(sourceAccount);
            expect(outgoingIBA).to.have.property('description').equal(`IBA Outgoing of 100 from account 0 to bank 2`);
        });
    });

    describe('make - success', () => {
        const sourceAccount = new TestAccount();
        sourceAccount.balance = 100;
        const bank = new Bank('Bank 1', 1, new TestAgency());
        bank.openAccount(sourceAccount);
        it('should make outgoing IBA operation', () => {
            const outgoingIBA = new IBAOutgoingOperation(bank, sourceAccount, 2, 2, 100);
            const spy = chai.spy.on(outgoingIBA, 'makeOperationScenario', () => {
                return;
            });
            outgoingIBA.make();
            expect(spy).to.have.been.called();
        });
    });

    describe('make - fail', () => {
        const sourceAccount = new TestAccount();
        sourceAccount.balance = 100;
        const bank = new Bank('Bank 1', 1, new TestAgency());
        bank.openAccount(sourceAccount);
        const outgoingIBA = new IBAOutgoingOperation(bank, sourceAccount, 2, 2, 100);
        const transaction = outgoingIBA.transaction;
        it('should fail on incoming IBA operation', () => {
            const spy = chai.spy.on(transaction, 'makeTransaction', () => {
                return;
            });
            outgoingIBA.make();
            expect(spy).to.have.been.called();
        });
    });
});