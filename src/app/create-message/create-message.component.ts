import { Component, OnInit} from '@angular/core';
import { DataService } from '../core/data.service';
import { Message } from '../models/message';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { MessageError } from '../models/messageerror';
import { MessageType } from '../models/messagetype';
import { Router, ActivatedRoute } from '@angular/router';

//const URL = 'http://localhost:4200/api/upload'; // TO-DO: POST attachment to DB and get back encrypted file ID.
const URL='';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/ngx-select-dropdown/dist/assets/style.css']
})
export class CreateMessageComponent implements OnInit {
  allmessagetypes : MessageType [];
  recipienttypes = ['State','Agency','Agent','Producer Code'];
  recipientsearchoptions = ['Starts with', 'Contains', 'Exactly'];
  currDate = new Date().toISOString(); //toISOString().slice(0, 19).replace('T', ' '); to convert SQL time format
  Username = 'Sarita Viswanadham'; // need to be pulled over from inquiry api
  ProducerCode = '419999'; // need to be pulled over from inquiry api
  messageModel =  new Message( 0,'','','','',[],['',''],'',this.Username,this.ProducerCode,this.currDate,'','',''); // initialize new attributes added to the message model
  submitted = false;
  isUpdate = false;
  isCreate = true;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  public showPreviewContent = false;
  public showStateWideFields = false;
  public showAgentSpecificFields = false;
  public showAgencySpecificFields = false;
  private subscriptionForEdit: any
  constructor( private dataService: DataService,
               private router: Router,
               private route: ActivatedRoute ) {}
  messagetypeList =[];
  selectedItems=[];
  messagedropdownSettings={};
  statedropdownList = [];
  stateselectedItems = [];
  statedropdownSettings = {};
  recepientdropdownList = [];
  recepientselectedItems = [];
  recepientdropdownSettings = {};

  ngOnInit() {
    //Implementation to handle Edit Message
    this.subscriptionForEdit = this.route.queryParams.subscribe(params => {
        let messageID = params["MessageId"];
        console.log('inside ngInit..............'+ messageID);
        if(messageID) {
            this.getMessageToEdit(messageID);
        }
    });

    //Implementation to handle Create Message
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
    this.dataService.getMessageTypes()
    .subscribe(
        (data: MessageType[]) => this.allmessagetypes = data,
        (err : MessageError) => console.log(err.userMessage),
        () => console.log('Retrieved message types successfully.')
    );
    this.statedropdownList = [
        { item_id: 1, item_text: 'AR' },
        { item_id: 2, item_text: 'CA' },
        { item_id: 3, item_text: 'FL' },
        { item_id: 4, item_text: 'GA' },
        { item_id: 5, item_text: 'IN' },
        { item_id: 6, item_text: 'KY' },
        { item_id: 7, item_text: 'MO' },
        { item_id: 8, item_text: 'OH' },
        { item_id: 9, item_text: 'TN' },
        { item_id: 10, item_text: 'TX' },
        { item_id: 11, item_text: 'VA' },
    ]
    this.statedropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 11,
        allowSearchFilter: true,
        };
    this.recepientdropdownList = [
        { item_id: 1, item_text: 'State' },
        { item_id: 2, item_text: 'Agency' },
        { item_id: 3, item_text: 'Agent' },
        { item_id: 4, item_text: 'Producer Code' }]

    this.recepientdropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 11,
    allowSearchFilter: false,
    };
}

    //GET call to retreive message by ID
    getMessageToEdit(messageID: number) {
            this.dataService.getMessage(messageID)
        .subscribe(
            (data: Message) => this.fillForm(data),
            (err : any) => console.log(err),
            () => console.log('Received Message for Edit')
        );
    }

    fillForm(editMessageModel: Message) {
        this.messageModel.MessageId = editMessageModel.MessageId; // should this be 0 or same as original??- need to check!
        this.messageModel.TypeName = editMessageModel.TypeName;
        this.messageModel.PostedBy = editMessageModel.PostedBy;
        this.messageModel.UserProducerCode = editMessageModel.UserProducerCode;
        this.messageModel.DatePosted = editMessageModel.DatePosted;
        this.messageModel.DateViewable = editMessageModel.DateViewable;
        this.messageModel.DateExpires = editMessageModel.DateExpires;
        this.messageModel.DateViewable = editMessageModel.DateViewable;
        this.messageModel.Subject = editMessageModel.Subject;
        this.messageModel.MessageText = editMessageModel.MessageText;
        this.isCreate = false;
        this.isUpdate = true;
    }

    onSelectTypeName() {
      if (this.messageModel.TypeName == 'Broadcast') {  //Broadcast
        this.showStateWideFields = false;
        this.showAgencySpecificFields = false;
        this.showAgentSpecificFields = false;
      }
      else if (this.messageModel.TypeName == 'StateWide') { //Statewide
          this.showStateWideFields = true;
          this.showAgencySpecificFields = false;
          this.showAgentSpecificFields = false;
      } else if (this.messageModel.TypeName == 'AgencySpecific') {   //Agent specific
          this.showAgencySpecificFields = true;
          this.showStateWideFields = false;
          this.showAgentSpecificFields = false;
      } else if (this.messageModel.TypeName == 'AgentSpecific') {   //Agency specific
          this.showAgentSpecificFields = true;
          this.showAgencySpecificFields = false;
          this.showStateWideFields = false;
      }
    }
    onSelectState(item:any) {
        console.log(item);
    }
    onSelectAllStates(item:any) {
    //this.messageModel.States = item.item_text;
        console.log(item);
    }
    showPreview() {
        this.showPreviewContent = true;
    }

  //Submit newly created message.
   onSubmit() {
       this.submitted = true;
       let newMessage: Message = <Message>this.messageModel;
       if(this.isCreate) {
        this.dataService.createNewMessage(newMessage)
        .subscribe(
            (newMessage : Message) => console.log(newMessage),
            (err: MessageError) => console.log(err.userMessage),
            () => console.log('Created new message successfully')  
        );
        } else if(this.isUpdate) {
            this.dataService.updateMessage(newMessage)
            .subscribe(
            (data: void) => console.log('Updated message successfully'),
            (err: MessageError) => console.log(err.userMessage),
        );
        }
       this.router.navigate(['/messages']); //After posting data navigate to the inbox page
    }
}
