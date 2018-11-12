export class Recipient {
    constructor(
        // attributes used for create message
        public MessageDistId: number,
        public MemberId : number,
        public ProducerCode : number,
        public State: string,
        // attributes used for display message (inbox)
        public RecepientName : string,
        public Read : string,
        public DateRead : string,
        public Deleted : string,
        public DateDeleted : string,
        public Archived : string
    ){}
}