import { LightningElement, api, track} from 'lwc';
import authenticate from "@salesforce/apex/CreateGoogleCalenderEvent.createAuthURL";
import getAccessToken from "@salesforce/apex/CreateGoogleCalenderEvent.getAccessToken";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
export default class ScheduleInterviewAction extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track isModalOpen = false;
    @track authUrl ;

    handleSuccess(event) {
        // Close the modal window and display a success toast
        authenticate().then(result => {
            this.authUrl = result;
            window.location.href = result;
            console.log(this.authUrl);
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

        this.dispatchEvent(new CloseActionScreenEvent());
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Opportunity Record Updated!',
                variant: 'success'
            })
        );
   }

}