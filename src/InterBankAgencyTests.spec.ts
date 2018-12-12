import {IBATransfer, InterBankAgency} from "./model/iba/InterBankAgency";
import {Bank} from "./model/bank";
import {ExtenedAccount} from "./model/accounts/extended-account";
import {DepositOperation} from "./model/operations/operation";
import chai = require('chai');

const expect = chai.expect;
describe('Inter Account Agency', () => {
    let agency;
    let bank1;
    let bank2;
    let account1: ExtenedAccount;
    let account2: ExtenedAccount;
    before(() => {
        agency = new InterBankAgency();
        bank1 = new Bank('Bank 1', 1, agency);
        bank2 = new Bank('Bank 2', 2, agency);
        account1 = new ExtenedAccount('Test Owner 1', 1);
        account2 = new ExtenedAccount('Test Owner 2', 1);
        new DepositOperation(200, account1).make();
        bank1.openAccount(account1);
        bank2.openAccount(account2);
    });

    it('should throw error when creating bank with already existing id', () => {
        expect(() => {
            new Bank('Account 1', 1, agency);
        }).to.throw();
    });

    it('should create bank 2', () => {
        const bank = new Bank('Account 3', 3, agency);
        expect(bank).to.have.property('name').to.equal('Account 3');
        expect(bank).to.have.property('id').to.equal(3);
    });

    it('should transfer amount between two banks', () => {
        const ibaTransfer = new IBATransfer(100, 1, 1, 2, 1);
        bank1.makeTransaction(ibaTransfer);
        expect(account2.availableFunds()).to.equal(100);
    });

    it('should fail when target bank id is incorrect', () => {
        expect(() => {
            const ibaTransfer = new IBATransfer(100, 1, 1, 200, 1);
            bank1.makeTransaction(ibaTransfer);
        }).to.throw();
    });

    it('should fail when source bank id is incorrect', () => {
        expect(() => {
            const ibaTransfer = new IBATransfer(100, 200, 1, 2, 1);
            bank1.makeTransaction(ibaTransfer);
        }).to.throw();
    });

    it('should fail when target bank client id is incorrect', () => {
        expect(() => {
            const ibaTransfer = new IBATransfer(100, 1, 1, 2, 100);
            bank1.makeTransaction(ibaTransfer);
        }).to.throw();
    });


});