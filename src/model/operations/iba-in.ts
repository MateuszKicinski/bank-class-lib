import {Bank} from "../bank";
import {IBATransaction} from "../iba/InterBankAgency";
import {Account} from "../accounts/account";
import {Report} from "../reports";
import {Operation, OperationType} from "./operation";

export class IBAIncomingOperation implements Operation {
    amount: number;
    description: string;
    executionDate: Date;
    type: OperationType.IBAIncomingOperation;
    private bank: Bank;
    private transaction: IBATransaction;
    private targetAccount: Account;

    constructor(bank: Bank, transaction: IBATransaction) {
        this.bank = bank;
        this.transaction = transaction;
        this.amount = transaction.amount;
    }


    details(): string {
        return "";
    }

    generateReport(): Report {
        return undefined;
    }

    isPossible(): boolean {
        const fittingAccounts = this.bank.accounts.filter(account => account.getId() === this.transaction.targetClientInfo);
        this.targetAccount = fittingAccounts[0];
        const possible = fittingAccounts.length === 1;
        if (!possible) {
            this.bank.fail(this.transaction);
        }
        return possible;
    }

    public make() {
        if (this.isPossible()) {
            this.executionDate = new Date();
            this.makeOperationScenario();
        } else {
            throw new Error('Operation cannot be made!');
        }
    };

    makeOperationScenario() {
        this.targetAccount.add(this);
    }
}