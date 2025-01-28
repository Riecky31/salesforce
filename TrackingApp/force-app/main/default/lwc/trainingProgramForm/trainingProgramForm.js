import { LightningElement, track } from 'lwc';
import getCertificates from '@salesforce/apex/CertificateController.getCertificates';

export default class CertificateList extends LightningElement {
    @track certificates = [];
    @track error;
    @track assignedTo = '';
    @track startDate = '';
    @track endDate = '';

    columns = [
        { label: 'Certificate Name', fieldName: 'Name' },
        { label: 'Assigned To', fieldName: 'Assigned_to__c' },
        { label: 'Date Issued', fieldName: 'Date_issued__c', type: 'date' }
    ];

    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value; // Dynamically set properties based on the input name
    }

    handleSearch() {
        getCertificates({
            assignedTo: this.assignedTo,
            startDate: this.startDate,
            endDate: this.endDate
        })
            .then((result) => {
                this.certificates = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.certificates = [];
            });
    }
}
