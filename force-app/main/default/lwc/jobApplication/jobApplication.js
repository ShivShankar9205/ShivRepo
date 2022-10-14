import { LightningElement, track, api, wire } from 'lwc';
import getjobApplications from "@salesforce/apex/JobApplications.getJobApplication";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    { label: 'Candidate Name', fieldName: 'Name', type: 'text'},
    { label: 'Position', fieldName: 'position', type: 'text'},
    { label: 'Status', fieldName: 'status', type: 'text', editable: true },
    { label: 'Interviewer Name', fieldName: 'IntName', type: 'text' },
];
export default class JobApplication extends LightningElement {

    @track columns = columns;
    @track data = [];
    @track jobList = [];

    connectedCallback(){
        getjobApplications().then(result => {
            for(var key in result){
                this.jobList = result[key];
            }
            console.log(result);
            console.log(this.jobList);
        })
        .catch(error => { 
            this.Data = undefined;
            const evt = new ShowToastEvent({
                title: 'Unexpected Error While Authentication',
                message: 'Authorization error',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
            console.log(error);
        });
    }

    /*@wire(getjobApplications) jobApps;
    
    jobApps({error,data}) {
        if (data) {
            console.log('data=',data);
            this.jobList = data;
            console.log(this.jobList);
        } else if (error) {
            this.error = error;
        }
    }*/
}