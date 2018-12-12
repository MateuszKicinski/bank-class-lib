export interface Reportable {
    toReport(): ReportContent;
}

export class ReportContent {
    category: string;
    name: string;
    details: string;

    constructor(category: string, name: string, details: string) {
        this.category = category;
        this.name = name;
        this.details = details;
    }
}