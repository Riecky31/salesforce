import { LightningElement, wire, track } from 'lwc';
import getUsers from '@salesforce/apex/UserController.getUsers'; // Apex method to fetch users

export default class UserMultiSelect extends LightningElement {
    @track userOptions = []; // To store user options for combobox
    @track selectedUserIds = []; // To store selected user IDs

    @wire(getUsers)
    wiredUsers({ error, data }) {
        if (data) {
            this.userOptions = data.map(user => ({
                label: user.Name,
                value: user.Id,
            }));
        } else if (error) {
            console.error('Error fetching users:', error);
        }
    }

    handleUserChange(event) {
        this.selectedUserIds = event.detail.value;
        // Dispatch the selected IDs to the parent component
        this.dispatchEvent(new CustomEvent('selectionchange', {
            detail: { selectedIds: this.selectedUserIds }
        }));
    }
}
