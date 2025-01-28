import { LightningElement, track } from 'lwc';  // Import necessary modules
import getCertificateProgress from '@salesforce/apex/CertificateProgressController.getCertificateProgress';
import saveCertificateProgress from '@salesforce/apex/CertificateProgressController.saveCertificateProgress';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';  // Make sure to import ShowToastEvent

export default class StatusBar extends LightningElement {
    @track certificates = [];
    progress = 0;

    connectedCallback() {
        // Fetch certificate progress from Apex
        getCertificateProgress()
            .then((data) => {
                console.log('Fetched data: ', data);

                // Check if data is returned as expected
                if (data && data.length > 0) {
                    this.certificates = data.map((record) => ({
                        id: record.Id,
                        name: record.Certificate_name__c,
                        done: record.Is_Completed__c
                    }));
                    this.calculateProgress();
                } else {
                    console.log('No certificates data found.');
                }
            })
            .catch((error) => {
                this.showToast('Error', 'Failed to load certificates', 'error');
                console.error(error);
            });
    }

    // Handle checkbox toggle
    handleToggle(event) {
        const certIndex = event.target.dataset.index;
        this.certificates[certIndex].done = event.target.checked;
        this.calculateProgress();
    }

    // Calculate the progress percentage
    calculateProgress() {
        const totalCertificates = this.certificates.length;
        const completedCertificates = this.certificates.filter(cert => cert.done).length;
        this.progress = totalCertificates > 0 
            ? Math.round((completedCertificates / totalCertificates) * 100) 
            : 0;
    }

    // Save the progress
    saveProgress() {
        const progressList = this.certificates.map((cert) => ({
            Id: cert.id,
            Certificate_name__c: cert.name,
            Is_Completed__c: cert.done
        }));

        saveCertificateProgress({ progressList })
            .then(() => {
                this.showToast('Success', 'Progress saved successfully', 'success');
            })
            .catch((error) => {
                this.showToast('Error', 'Failed to save progress', 'error');
                console.error(error);
            });
    }

    // Define the showToast method for displaying messages
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
