import { LightningElement, track } from 'lwc';
import getCertificates from '@salesforce/apex/CertificateController.getCertificates';

export default class CertificateList extends LightningElement {
    @track groupedCertificates = [];
    @track isLoading = true;
    @track error;

    connectedCallback() {
        this.fetchCertificates();
    }

    async fetchCertificates() {
        try {
            this.isLoading = true;
            const result = await getCertificates();
            console.log('Fetched certificates:', result); // Check the raw result

            if (result) {
                // Process the grouped data to make it suitable for display
                this.groupedCertificates = Object.entries(result).map(([internId, certificates]) => {
                    return {
                        internId,
                        internName: certificates[0].Intern__r.Name, // Use the intern's name
                        certificates: certificates.map(cert => ({
                            ...cert,
                            formattedDateissued: this.formatDate(cert.Date_issued__c), // Format Date
                        })),
                    };
                });
            } else {
                this.error = 'No certificates found.';
            }
        } catch (err) {
            this.error = err.body.message || 'An error occurred while fetching data';
        } finally {
            this.isLoading = false;
        }
    }

    // Method to format DateTime
    formatDate(dateTimeString) {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return new Intl.DateTimeFormat('en-US', options).format(date);
        } catch (error) {
            return dateTimeString; // If there’s an issue, return the original value
        }
    }
}
