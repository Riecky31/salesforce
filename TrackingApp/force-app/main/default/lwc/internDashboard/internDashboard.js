import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';
import getDashboardMetrics from '@salesforce/apex/DashboardController.getDashboardMetrics';

export default class InternDashboard extends LightningElement {
    activeInterns;
    totalInterns;
    consultantInterns;
    totalCertificates;
    internsPerProgram = [];
    chart;
    isChartJsInitialized = false;

    @wire(getDashboardMetrics)
    wiredDashboard({ error, data }) {
        if (data) {
            this.activeInterns = data.activeInterns;
            this.totalInterns = data.totalInterns;
            this.consultantInterns = data.consultantInterns;
            this.totalCertificates = data.totalCertificates;
            this.internsPerProgram = data.internsPerProgram;
            this.renderChart();
        } else if (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }

    // Getter function to check if there is data
    get hasInternsData() {
        return this.internsPerProgram && this.internsPerProgram.length > 0;
    }

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([loadScript(this, ChartJS)])
            .then(() => {
                this.renderChart();
            })
            .catch(error => {
                console.error('Error loading Chart.js:', error);
            });
    }

    renderChart() {
        if (!this.hasInternsData || !this.template.querySelector('canvas')) {
            return;
        }

        const ctx = this.template.querySelector('canvas').getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.internsPerProgram.map(program => program.programName),
                datasets: [{
                    label: 'Intern Count',
                    data: this.internsPerProgram.map(program => program.internCount),
                    backgroundColor: ['#0070D2', '#54D8FF', '#FFA726', '#66BB6A', '#FF7043'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1500,
                    easing: 'easeInOutBounce'
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
