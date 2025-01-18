import { LightningElement, api, wire } from 'lwc';
import getInternsByTrainingProgram from '@salesforce/apex/InternListController.getInternsByTrainingProgram';

export default class InternList extends LightningElement {
    @api recordId; // This will hold the Training Program record ID
    internList = [];
    error;

    // Wire the Apex method to get related Intern records
    @wire(getInternsByTrainingProgram, { trainingProgramId: '$recordId' })
    wiredInternList({ error, data }) {
        if (data) {
            this.internList = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.internList = [];
            console.error(error);
        }
    }
}
