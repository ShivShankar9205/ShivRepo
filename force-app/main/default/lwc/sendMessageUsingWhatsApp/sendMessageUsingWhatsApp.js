import { LightningElement,track } from 'lwc';
import sendWAMessage from '@salesforce/apex/WhatsAppIntegration.sendWAMessage';
export default class SendMessageUsingWhatsApp extends LightningElement {

    @track message;
    sendMessage(){

        sendWAMessage({message:this.message}).then(result=>{
            console.log('Message Sent');
        })

    }

    onChangeHandler(event){
        console.log(event.target.name);
        if(event.target.name==='message'){
            this.message=event.target.value;
        }
    }
}