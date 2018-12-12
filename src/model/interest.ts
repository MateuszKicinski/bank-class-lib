import {Report, Reportable, ReportType} from "./reports";

export interface Interest extends Reportable {
    type: InterestType;

    calculate(): number;
}

export enum InterestType {
    SimpleInterest = 'Simple'
}

export class SimpleInterest implements Interest {
    type: InterestType;
    interestValue: number;

    constructor(intialAmount: number, percentage: number) {
        this.interestValue = intialAmount * (percentage / 100);
    }

    calculate(): number {
        return this.interestValue;
    }

    generateReport(): Report {
        return new SimpleInterestReport(this);
    }
}

export class SimpleInterestReport implements Report {
    reportType: ReportType.SimpleInterestReport;
    interest: SimpleInterest;

    constructor(interest: SimpleInterest) {
        this.interest = interest;
    }

    toString(): string {
        return `${this.reportType} with value ${this.interest.interestValue}`;
    }
}