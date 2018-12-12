import {Report, Reportable, ReportType} from "../reports";

export abstract class Operation implements Reportable {
    executionDate: Date;
    abstract type: OperationType;
    abstract amount: number;
    abstract description: string;

    abstract make();

    generateReport(): Report {
        return new OperationReport(this);
    }

    details(): string {
        return `Date: ${this.executionDate} Description: ${this.description}`;
    }
}

export enum OperationType {
    DepositOperation = 'Deposit',
    Withdraw = 'Withdraw',
    TransferOperation = 'Transfer',
    IBAIncomingOperation = 'IBA Incoming',
    IBAOutgoingOperation = 'IBA Outgoing',
    LinkedAccountOperation = 'Linked Account',
}

export class OperationCannotBeMadeError implements Error {
    message = 'Operation cannot be made!';
    name = 'OperationCannotBeMadeError';
    stack: string;
}

export class OperationReport implements Report {
    reportType: ReportType.OperationRepor;
    operation: Operation;

    constructor(operation: Operation) {
        this.operation = operation;
    }

    toString(): string {
        return `${this.reportType} | Operation type: ${this.operation.type} | Amount: ${this.operation.amount}`;
    }
}
