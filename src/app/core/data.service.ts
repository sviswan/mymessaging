import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Message } from '../models/message';
import { MessageType } from '../models/messagetype';
import { MessageError } from '../models/messageerror';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class DataService {

    constructor( private http: HttpClient) { }
    private URL = 'http://localhost:54102/admin/'

    //Retrieve all (current & archived) agency messages // this might need a resolver if its slow.
    getAllMessages(): Observable<Message[] | MessageError> {
        return this.http.get<Message[]>(this.URL+'retrievemessages', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyQVBJIiwiaWF0IjoxNTM5NzY3Njc3LCJ0aWQiOiI5ZDAzZWY4MC1kOWVlLTQ5N2EtODJmNi0xZjgzZmI3NThkZTYiLCJtZW1iZXJpZCI6MTg5ODAzLCJtZW1iZXJ0eXBlIjoiVFNNIiwibWVtYmVybmFtZSI6IlNhcml0YSBWaXN3YW5hZGhhbSIsImVtYWlsIjoic3Zpc3dhbmFkaGFtQGFsZmFpbnN1cmFuY2Vjb21wYW55LmNvbSIsInBob25lbnVtYmVyIjoiLS0iLCJwcm9kdWNlcmNvZGUiOiI0MTk5OTkiLCJzdGF0ZSI6IlROIiwiYWNjZXNzcmlnaHRzIjpbIkFjY291bnRpbmcgQ2VudGVyIiwiQWdlbnQgU2NvcmVjYXJkIEFjY2VzcyIsIkF1ZGF0ZXgiLCJETVMiLCJEb2N1bWVudCBSZXRyaWV2YWwiLCJEb3dubG9hZCBNYXRlcmlhbHMiLCJFbmRvcnNlIiwiR2hvc3REcmFmdCIsIk1ha2UgUGF5bWVudHMiLCJNYW5hZ2UgQWdlbmN5IE1lc3NhZ2VzKEVkaXQgTWFpbCkiLCJPd25lciBTY29yZWNhcmQgQWNjZXNzIiwiUG9saWN5IENlbnRlciIsIlByb2R1Y2VyIEFkbWluIiwiUHJvcHJpZXRhcnkgUmVwb3J0aW5nIiwiUmVjZWl2ZSBkYWlseSBwZW5kaW5nIGl0ZW1zIGVtYWlsIiwiU2V0dGluZ3MgTWFuYWdlbWVudCIsIlNldHRpbmdzIFZpZXciLCJXcml0ZSBOZXcgQnVzaW5lc3MiXSwiYWdlbnQiOnsicHJvZHVjZXJjb2RlIjoiNDE5OTk5IiwiYWdlbmN5bmFtZSI6IkFsZmFWaXNpb24iLCJjcHN1ZmZpeCI6IlRTVCIsIm9wZmZsYWciOiJGYWxzZSIsInN0YXR1cyI6IkEifX0.RUNUWs5sI05c0pEXs9SGUfr3Lv1WhdyRbYwObH96Ebc'})
            })
        .pipe(
            catchError(err => this.handleHttpGetAllMessagesError(err))
        );
    }

    private handleHttpGetAllMessagesError(error: HttpErrorResponse): Observable<MessageError> {
        let dataError = new MessageError();
        dataError.errorNumber = 100;
        dataError.message = error.statusText;
        dataError.userMessage = 'An error occured while retrieving messages for Inbox.';
        return ErrorObservable.create(dataError);
    }

    //Retrieve Agency message type for 'create new message' view
    getMessageTypes(): Observable<MessageType[] | MessageError> {
        return this.http.get<MessageType[]>(this.URL+ 'messagetypes')
        .pipe(
            catchError(err => this.handleHttpGetMessageTypes(err))
        );
    }

    private handleHttpGetMessageTypes(error: HttpErrorResponse): Observable<MessageError> {
        let dataError = new MessageError();
        dataError.errorNumber = 200;
        dataError.message = error.statusText;
        dataError.userMessage = 'An error occured while retrieving message types for Create Message.';
        return ErrorObservable.create(dataError);
    }
    
    //Retrieve existing message for EDIT
    getMessage(messageID: number): Observable<Message | MessageError>{
        let URL_msgID= this.URL+ 'getmessage?MessageID=' + messageID;
        return this.http.get<Message>(URL_msgID, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        })
        .pipe(
            catchError(err => this.handleHttpGetMessage(err))
        );
    }

    private handleHttpGetMessage(error: HttpErrorResponse): Observable<MessageError> {
        let dataError = new MessageError();
        dataError.errorNumber = 300;
        dataError.message = error.statusText;
        dataError.userMessage = 'An error occured while retrieving a message for Edit.';
        return ErrorObservable.create(dataError);
    }
    
    // Post newly created message
    createNewMessage(newMessage : Message): Observable<Message | MessageError> {
        return this.http.post<Message>(this.URL+'createmessage', newMessage, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(
            catchError(err => this.handleHttpPostNewMessage(err))
        );
    }

    private handleHttpPostNewMessage(error: HttpErrorResponse): Observable<MessageError> {
        let dataError = new MessageError();
        dataError.errorNumber = 200;
        dataError.message = error.statusText;
        dataError.userMessage = 'An error occured while retrieving message types for Create Message.';
        return ErrorObservable.create(dataError);
    }

    //Put edited message that already exists
    updateMessage(updatedMessage : Message) : Observable<void | MessageError> {
        return this.http.put<void>(this.URL+ 'updatemessage', updatedMessage, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(
            catchError(err => this.handleHttpPutMessage(err))
        );
    }

    private handleHttpPutMessage(error: HttpErrorResponse): Observable<MessageError> {
        let dataError = new MessageError();
        dataError.errorNumber = 200;
        dataError.message = error.statusText;
        dataError.userMessage = 'An error occured while retrieving message types for Create Message.';
        return ErrorObservable.create(dataError);
    }
 
    // Delete an existing message (Inbox line item)
    deleteMessage(messageIDs: number[]) {
            return this.http.request('DELETE', this.URL+'deletemessage', {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
                body: { "MessageIds": messageIDs }
            });
    }
    
        //Delete one or more records from Recipient List
    deleteRecepient(recipientID: number) : Observable<void | MessageError> {
        return this.http.delete<void>(this.URL+ 'deleterecipient/${recipientID}',{
            params: new HttpParams({
                fromString: 'param1=${messageID}&param2=${producercode}&param3-${memberID}&param4=${state}'
            })
        })
        .pipe(
            catchError(err => this.handleHttpDeleteRecipient(err))
        );
    }

    private handleHttpDeleteRecipient(error: HttpErrorResponse): Observable<MessageError> {
        let dataError = new MessageError();
        dataError.errorNumber = 200;
        dataError.message = error.statusText;
        dataError.userMessage = 'An error occured while retrieving message types for Create Message.';
        return ErrorObservable.create(dataError);
    }
}