import chai = require('chai');
import {Account} from "../../model/accounts/account";
import {Operation} from "../../model/operation";
import {Interest} from "../../model/interest";

const expect = chai.expect;

describe('account tests', () => {
    describe('check', () => {
        let account;
        before(() => {
            account = new Account(1, 'TestOwner');
            account.balance = 300;
        });

        it('should show correct balance of account', () => {
            expect(account.checkBalance()).equal(300);
        });
    });

    describe('add', () => {
        let account;
        before(() => {
            account = new Account(1, 'TestOwner');
            account.balance = 300;
        });

        it('should add correct amount of money to account', () => {
            account.add(new TestOperation(200));
            expect(account.checkBalance()).equal(500);
        });
    });

    describe('subtract - success', () => {
        let account;
        before(() => {
            account = new Account(1, 'TestOwner');
            account.balance = 300;
        });

        it('should subtract correct amount of money from account', () => {
            account.subtract(new TestOperation(200));
            expect(account.balance).equal(100);
        });
    });

    describe('subtract - error', () => {
        let account;
        before(() => {
            account = new Account(1, 'TestOwner');
            account.balance = 300;
        });

        it('should throw error when trying to subtract more money than in balance', () => {
            expect(() => account.subtract(new TestOperation(400))).to.throw()
        });
    });

    describe('should add new interest to account without interest', () => {
        let account;
        before(() => {
            account = new Account(1, 'TestOwner');
            account.changeInterest(new TestInterest());
            account.balance = 300;
        });

        it('should throw error when trying to subtract more money than in balance', () => {
            expect(account.interest.calculate()).equal(-1);
        });
    });


});

export class TestOperation extends Operation {
    amount: number;
    description: string;
    type: null;

    constructor(amount) {
        super();
        this.amount = amount;
    }


    isPossible(): boolean {
        return false;
    }

    makeOperationScenario() {
    }
}

export class TestInterest implements Interest {
    calculate(): number {
        return -1;
    }

    type: null;
}



