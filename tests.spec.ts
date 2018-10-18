import {Account} from './classes';
import chai = require('chai');

const expect = chai.expect;

describe('account tests', () => {
    let account;
    before(() => {
        account = new Account(1,1);
        account.balance = 300;
    });
    it('should show correct balance of account', () => {
        expect(account.currentBalance()).equal(300);
    });
});