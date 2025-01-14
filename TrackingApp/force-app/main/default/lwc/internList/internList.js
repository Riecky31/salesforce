import { LightningElement, track, wire } from 'lwc';
import getInternsByUser from '@salesforce/apex/InternController.getInternsByUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_ID from '@salesforce/user/Id';

export default class InternList extends LightningElement {
    @track interns = [];
    userId = USER_ID;

    @wire(getInternsByUser, { userId: '$userId' })
    wiredInterns({ error, data }) {
        if (data) {
            this.interns = data;
        } else if (error) {
            this.showToast('Error', 'Failed to load interns', 'error');
        }
    }

    // Getter to check if interns array has data
    get hasInterns() {
        return Array.isArray(this.interns) && this.interns.length > 0;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
