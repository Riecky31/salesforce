import { LightningElement, track } from 'lwc';
import getCertificates from '@salesforce/apex/CertificateController.getCertificates';

export default class CertificateList extends LightningElement {
    @track certificates = [];
    @track isLoading = true;
    @track error;

    connectedCallback() {
        this.fetchCertificates();
    }

    async fetchCertificates() {
        try {
            this.isLoading = true;
            const result = await getCertificates();
            this.certificates = result;
        } catch (err) {
            this.error = err.body.message || 'An error occurred while fetching data';
        } finally {
            this.isLoading = false;
        }
    }
}
