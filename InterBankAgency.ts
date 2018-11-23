export class InterBankAgency {
    private banks: IBABank[] = [];

    registerBank(bank: IBABank) {
        this.banks.push(bank);
    }

    isIdFree(id: number) {
        return !!this.findBank(id);
    }

    findBank(id:number):IBABank{
       return this.banks.filter(bank => bank.getId() === id)[0];
    }
}

export abstract class IBABank {
    private readonly name: string;
    private readonly id: number;
    private agency: InterBankAgency;

    constructor(name: string, id: number, agency: InterBankAgency) {
        if (agency.isIdFree(id)) {
            this.name = name;
            this.id = id;
            agency.registerBank(this);
            this.agency = agency;
        } else {
            throw Error(`Bank with id: ${id} already exists`);
        }
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    makeTransaction(transaction: IBATransaction) {
        transaction.makeTransaction(this.agency);
    }

    abstract receiveTransaction(transaction: IBATransaction)

    abstract fail()
}


export interface IBATransaction {
    sourceBankId: number;
    targetBankId: number;
    sourceClientInfo: any;
    targetClientInfo: any;
    amount: number;

    makeTransaction(agency: InterBankAgency);
}

export class IBATransfer implements IBATransaction {
    amount: number;
    sourceBankId: number;
    sourceClientInfo: any;
    targetBankId: number;
    targetClientInfo: any;

    constructor(amount: number,
                sourceBankId: number,
                sourceClientInfo: any,
                targetBankId: number,
                targetClientInfo: any) {
        this.amount = amount;
        this.sourceBankId = sourceBankId;
        this.sourceClientInfo = sourceClientInfo;
        this.targetBankId = targetBankId;
        this.targetClientInfo = targetClientInfo;
    }

    makeTransaction(agency: InterBankAgency) {
        const targetBank = agency.findBank(this.targetBankId);
        const sourceBank = agency.findBank(this.sourceBankId);
        if(!targetBank){
            sourceBank.fail();
        } else{
            targetBank.receiveTransaction(this);
        }
    }
}

