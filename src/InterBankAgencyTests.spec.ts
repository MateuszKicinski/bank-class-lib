import {IBATransfer, InterBankAgency} from "./InterBankAgency";
import {Account, MyBank} from "./classes";
import chai = require('chai');

const expect = chai.expect;
describe('Inter Account Agency', () => {
    let agency;
    let bank1;
    let bank2;
    let account1 : Account;
    let account2 : Account;
    before(() => {
        agency = new InterBankAgency();
        bank1 = new MyBank('Account 1', 1, agency);
        bank2 = new MyBank('Account 2', 2, agency);
        account1 = new Account(1, 1);
        account2 = new Account(2, 2);
        bank1.accounts.push(account1);
        bank2.accounts.push(account2);
    });

    it('should throw error when creating bank with already existing id', () => {
        let error;
        let bank;
        try {
            bank = new MyBank('Account 1', 1, agency);
        } catch (e) {
            error = e;
        }
        expect(error).to.deep.equal('Account with id: 1 already exists');
        expect(bank).to.equal(undefined);
    });

    it('should create bank 2', () => {
        const bank = new MyBank('Account 3', 3, agency);
        expect(bank).to.have.property('name').to.equal('Account 3');
        expect(bank).to.have.property('id').to.equal(3);
    });

    it('should transfer amount between two banks', () => {
        const ibaTransfer = new IBATransfer(100, 1, 1, 2, 2);
        bank1.makeTransaction(ibaTransfer);
        expect(account2.currentBalance()).to.equal(100);
    });


});