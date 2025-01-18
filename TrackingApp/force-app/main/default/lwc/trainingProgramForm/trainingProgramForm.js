import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class TrainingProgramForm extends NavigationMixin(LightningElement) {
    handleSuccess(event) {
        const recordId = event.detail.id;

        // Show success toast message
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Training Program created successfully!',
                variant: 'success',
            }),
        );
 
        // Navigate to the new record's detail page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Training_Program__c', // Replace with your custom object API name
                actionName: 'view',
            },
        });
    }
}
