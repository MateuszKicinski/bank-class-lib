import {Account} from "./accounts/account";
import {IdGenerator} from "./utils";

export class Bank {
    accounts: Account[];

    openAccount() {
        this.accounts.push(new Account(IdGenerator.generateId()));
    }
}