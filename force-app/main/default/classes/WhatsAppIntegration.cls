/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 09-30-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class WhatsAppIntegration {
    @AuraEnabled
    public static void sendWAMessage( String message){
        //String contactNumber='917982994930';
        requestController(message);
        
    }
    public static void requestController(String messageBody){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://graph.facebook.com/v14.0/109661381911761/messages');
        req.setHeader('Content-Type', 'application/json');
        req.setMethod('POST');
        
        String apiKey='EAAHGEecp2xwBAFWFfX5doHfjfJMiLD9BtVe6ORw0ZCJtZBXHZBDe8R07JKgL6pRIKXQoEbUsFXJMZCYtvW0xlH1E17SJEPvZAu1CrvUtjsReYgdocHLcrDTqglJbUeZBFZALSo6b3W7CvEsN160v13bVku32aJD0G8ixGo9Q908CRs8ekxxvtyRpFzbDfbGYloByhRSTNyiyA95lLeCGR4C';
        String body='{"messaging_product":"whatsapp","to":"917982994930","text":{"body":"'+messageBody+'"}}';
        
        req.setHeader('Authorization', 'Bearer '+apiKey);
        //req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        req.setBody(body);
        HttpResponse response= new HttpResponse();
        response=h.send(req);
        system.debug('response>>'+response);
        system.debug('response>>'+response.getBody());
    }
}
