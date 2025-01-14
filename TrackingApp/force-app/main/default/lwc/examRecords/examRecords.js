import { LightningElement, wire } from 'lwc';
import getExamRecordsGroupedByIntern from '@salesforce/apex/ExamDataController.getExamRecordsGroupedByIntern';

export default class ExamRecords extends LightningElement {
    groupedData = []; 
    error; 

    @wire(getExamRecordsGroupedByIntern)
    wiredExamData({ error, data }) {
        if (data) {
            this.groupedData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.groupedData = [];
        }
    }
}
