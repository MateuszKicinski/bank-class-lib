import chai = require('chai');
import {Operation} from "../../model/operations/operation";
import {Interest} from "../../model/interest";
import {Report} from "../../model/reports";
import {ExtenedAccount} from "../../model/accounts/extended-account";

const expect = chai.expect;

describe('extended account tests', () => {
    describe('check', () => {
        let account;
        before(() => {
            account = new ExtenedAccount('TestOwner', 1);
            account.balance = 300;
        });

        it('should show correct balance of account', () => {
            expect(account.availableFunds()).equal(300);
        });
    });

    describe('add', () => {
        let account;
        before(() => {
            account = new ExtenedAccount('TestOwner', 1);
            account.balance = 300;
        });

        it('should add correct amount of money to account', () => {
            account.add(new TestOperation(200));
            expect(account.availableFunds()).equal(500);
        });
    });

    describe('subtract - success', () => {
        let account;
        before(() => {
            account = new ExtenedAccount('TestOwner', 1);
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
            account = new ExtenedAccount('TestOwner', 1);
            account.balance = 300;
        });

        it('should throw error when trying to subtract more money than in balance', () => {
            expect(() => account.subtract(new TestOperation(400))).to.throw()
        });
    });

    describe('should add new interest to account without interest', () => {
        let account;
        before(() => {
            account = new ExtenedAccount('TestOwner', 1);
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

    make() {
    }
}

export class TestInterest implements Interest {
    calculate(): number {
        return -1;
    }

    type: null;

    generateReport(): Report {
        return undefined;
    }
}



