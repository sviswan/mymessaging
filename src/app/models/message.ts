import { Recipient } from "./recipient";
import { Attachment } from "./attachment";
import { MessageType } from "./messagetype";

export class Message {
    constructor(
        //getmessages
        public MessageId : number,
        public Subject : string,
        //public MessageType : MessageType,
        public TypeName : string,
        public Recipienttypes : string,
        public RecipientSearchOptions : string,
        public Recipients : Recipient[],
        public States: string[],
        public State : string,
        public PostedBy : string,
        public UserProducerCode : string,
        public DatePosted : string,
        public DateViewable : string,
        public DateExpires : string,
        //public MessageAttachments : Attachment,
        public MessageText : string,
    ){}
}