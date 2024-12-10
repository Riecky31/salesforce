import { LightningElement, api, track, wire } from 'lwc';
import getExamFields from '@salesforce/apex/ExamController.getExamFields';

export default class BookExam extends LightningElement {
    @track examOptions = [];
    @track venueOptions = [];
    @track exam;
    @track venue;
    @track examDateTime;
    @track status;
    @track intern;

    // Wire method to fetch data from Apex
    @wire(getExamFields, { recordId: '$recordId' })
    wiredExamData({ data, error }) {
        if (data) {
            console.log("Exam: ", data);
            // Populate combobox options
            this.examOptions = data.examOptions;
            this.venueOptions = data.venueOptions;
            this.status = data.status;
            this.intern = data.internName;
        } else if (error) {
            console.error(error);
        }
    }

    // Handlers for field changes
    handleExamChange(event) {
        this.exam = event.detail.value;
    }

    handleVenueChange(event) {
        this.venue = event.detail.value;
    }

    handleDateChange(event) {
        this.examDateTime = event.detail.value;
    }

    handleBookExam() {
        // Logic for booking the exam
        alert(`Exam booked for ${this.exam} at ${this.venue} on ${this.examDateTime}`);
    }
}
