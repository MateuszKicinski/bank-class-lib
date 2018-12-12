import {Bank} from "../bank";
import {IBATransaction, IBATransfer} from "../iba/InterBankAgency";
import {Account} from "../accounts/account";
import {Report} from "../reports";
import {Operation, OperationType} from "./operation";

export class IBAOutgoingOperation implements Operation {
    amount: number;
    description: string;
    executionDate: Date;
    type: OperationType.IBAOutgoingOperation;
    private bank: Bank;
    private transaction: IBATransaction;
    private sourceAccount: Account;

    constructor(bank: Bank, sourceAccount: Account, targetBankId: number, targetClientInfo: any, amount: number) {
        this.bank = bank;
        this.transaction = new IBATransfer(amount, this.bank.getId(), sourceAccount.getId(), targetBankId, targetClientInfo);
        this.amount = this.transaction.amount;
        this.sourceAccount = sourceAccount;
    }

    details(): string {
        return "";
    }

    generateReport(): Report {
        return undefined;
    }

    isPossible(): boolean {
        return this.sourceAccount.availableFunds() > this.amount
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
        this.sourceAccount.subtract(this);
        this.transaction.makeTransaction(this.bank.getAgency());
    }
}