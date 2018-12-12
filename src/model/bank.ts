import {IBABank, IBATransaction, IBATransfer, InterBankAgency} from "./iba/InterBankAgency";
import {Account} from "./accounts/account";
import {IBAIncomingOperation} from "./operations/operation";

export class Bank extends IBABank {
    accounts: Account[] = [];

    constructor(bankName: string, bankId: number, ibaAgency: InterBankAgency) {
        super(bankName, bankId, ibaAgency);
    }

    openAccount(account: Account) {
        this.accounts.push(account);
    }

    fail(failedTransaction: IBATransaction) {
        new IBATransfer(failedTransaction.amount, failedTransaction.targetBankId, null, failedTransaction.sourceBankId, failedTransaction.sourceClientInfo).makeTransaction(this.getAgency());
    }

    receiveTransaction(transaction: IBATransaction) {
        new IBAIncomingOperation(this, transaction).make();
    }
}