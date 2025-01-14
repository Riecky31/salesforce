import { LightningElement, track, wire } from 'lwc';
import createCertificate from '@salesforce/apex/certificateController.createCertificate';
import getUserOptions from '@salesforce/apex/UserController.getUserOptions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InternCertificateForm extends LightningElement {
    @track certificateName = '';
    @track expirationDate = '';
    @track dateIssuedDateTime = '';
    @track internId = '';
    @track internOptions = []; // Store User options for the combobox

    // Fetch Users for the combobox
    @wire(getUserOptions)
    wiredUsers({ error, data }) {
        if (data) {
            this.internOptions = data.map(user => ({
                label: user.Name,
                value: user.Id
            }));
        } else if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading interns',
                    message: error.body.message,
                    variant: 'error',
                })
            );
        }
    }

    handleChange(event) {
        const field = event.target.name;
        if (field === 'name') {
            this.certificateName = event.target.value;
        } else if (field === 'expirationDate') {
            this.expirationDateTime = event.target.value;
        } else if (field === 'dateIssuedDateTime') {
            this.dateIssuedDateTime = event.target.value;
        } else if (field === 'internId') {
            this.internId = event.target.value;
        }
    }

    handleSave() {
        createCertificate({
            name: this.certificateName,
            expirationDateTime: this.expirationDate,
            dateIssuedDateTime: this.dateIssuedDateTime,
            internId: this.internId,
        })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Intern Certificate created successfully!',
                        variant: 'success',
                    })
                );
                this.clearFields();
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }

    clearFields() {
        this.certificateName = '';
        this.expirationDate = '';
        this.dateIssuedDateTime = '';
        this.internId = '';
    }
}
