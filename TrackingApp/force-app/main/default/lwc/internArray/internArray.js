import { LightningElement, track, wire } from 'lwc';
import fetchInternListRecords from '@salesforce/apex/InternListSelector.fetchInternListRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InternList extends LightningElement {
    @track groupedInterns = []; // Holds grouped data

    columns = [
        { label: 'Intern Name', fieldName: 'InternName', type: 'text' },
        { label: 'Training Program', fieldName: 'TrainingProgramName', type: 'text' },
    ];

    // Wire method to fetch records
    @wire(fetchInternListRecords)
    wiredInterns({ error, data }) {
        if (data) {
            // Grouping interns by Training Program
            const groupedData = this.groupByTrainingProgram(data);
            this.groupedInterns = groupedData;
        } else if (error) {
            this.showToast('Error', 'Error fetching intern records', 'error');
        }
    }

    // Group data by Training Program
    groupByTrainingProgram(data) {
        const grouped = {};

        // Loop through each intern and group by Training Program Name
        data.forEach((intern) => {
            const trainingProgram = intern.Training_Program__r?.Name || 'No Program Name';
            if (!grouped[trainingProgram]) {
                grouped[trainingProgram] = [];
            }

            grouped[trainingProgram].push({
                ...intern,
                InternName: intern.Intern__r?.Name || 'No Name', // Flattened field
                TrainingProgramName: trainingProgram, // Training Program Name
            });
        });

        // Convert grouped object to array of groups
        return Object.keys(grouped).map((key) => ({
            trainingProgram: key,
            interns: grouped[key],
        }));
    }

    // Utility to show toast notifications
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(evt);
    }
}
