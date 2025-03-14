import { LightningElement, api, wire, track } from "lwc";
import getGroupedExamsByRecord from "@salesforce/apex/ExamDataController.getGroupedExamsByRecord";

export default class ExamRecords extends LightningElement {
    @api recordId;  
    @track groupedExams = [];
    @track error;

    // Fetch Exams related to the given Exam Record ID
    @wire(getGroupedExamsByRecord, { recordId: "$recordId" })
    wiredExams({ error, data }) {
        if (data) {
            this.groupedExams = [
                {
                    internId: data[0]?.Intern__r?.Id || "Unknown",
                    internName: data[0]?.Intern__r?.Name || "Unknown Intern",
                    exams: data
                }
            ];
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.groupedExams = [];
        }
    }
}
