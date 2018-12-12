import {Bank} from "../../src/model/bank";
import {InterBankAgency} from "../../src/model/iba/InterBankAgency";
import {DebitAccount} from "../../src/model/accounts/debit-account";

describe('Bank integration tests', () => {

    describe('Multiple accounts creation', () => {
        const iba = new InterBankAgency();
        const bank = new Bank('Bank 1', 1, iba);
        it('should create multiple accounts with unique ids', () => {
            // const account1 = new DebitAccount(100);
        })
    });
});