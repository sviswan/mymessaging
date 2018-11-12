import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { Message } from '../models/message';
import { MessageError } from '../models/messageerror';
import { Recipient } from '../models/recipient';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class MessagesComponent implements OnInit {
private showRecipients = false;
private selectedmessageIDs: any[] = [];
allmessages : Message [];
recipientsPerMessage : Recipient[];
allrecepients : Recipient [];
messagetoedit : Message;
myForm: FormGroup;
  constructor( private dataService: DataService,
    private router: Router,
    private fb: FormBuilder ) {
  }

ngOnInit() {
    this.dataService.getAllMessages()
    .subscribe(
        (data: Message[]) => this.allmessages = data,
        (err : MessageError) => console.log(err.userMessage),
        () => console.log('Retrieved all messages successfully.')
    );
    this.myForm = this.fb.group({
        selectedmessagelist: this.fb.array([])
    });
}

onChange(messageID: number, isChecked: boolean) {
    const messagesArray = <FormArray>this.myForm.controls.selectedmessagelist;
    let i: any, j:any;
    if (isChecked) {
        messagesArray.push(new FormControl(messageID));
    } else {
      let index = messagesArray.controls.findIndex(x => x.value == messageID)
      messagesArray.removeAt(index);
    }
    this.selectedmessageIDs.push(messagesArray.value);
    console.log(this.selectedmessageIDs);
}

deleteSelectedMessages() {
    this.selectedmessageIDs = this.selectedmessageIDs[this.selectedmessageIDs.length-1];
    console.log(this.selectedmessageIDs);
    this.deleteMessage(this.selectedmessageIDs);
}

editMessage(messageID: number){
    let navigationExtras: NavigationExtras = {
        queryParams: {
            "MessageId": messageID
        },
        skipLocationChange: true //masking navigation to block SQL injection/unexpected behavior due to queryParams passed
    };
    this.router.navigate(['/create-message'], navigationExtras);
}

deleteMessage(messageIDs: number[]): void{
    this.dataService.deleteMessage(messageIDs) // need to pass messageID of the deleted item
    .subscribe(
        data => {
            //let index: number = this.allmessages.findIndex(message => message.MessageId == messageID)
        },
        (err: MessageError) => console.log(err.userMessage),
        () => console.log('Deleted message succesfully.')
    )
}

// deleteRecipient(recipientID: number): void{
//     this.dataService.deleteMessage(recipientID) // need to pass recipientID of the deleted item
//     .subscribe(
//         (data: void) => {
//             let index: number = this.allrecepients.findIndex(Recipient => Recipient.MessageDistId== recipientID)
//         },
//         (err: MessageError) => console.log(err.userMessage),
//         () => console.log('Deleted recipient successfully.')
//     )
// }

getRecipients(recipients: Recipient[]) {
    this.recipientsPerMessage = recipients;
    if (this.recipientsPerMessage.length == 0) {
        this.showRecipients = false;
    } else {
        this.showRecipients = true;
    }
}

}
