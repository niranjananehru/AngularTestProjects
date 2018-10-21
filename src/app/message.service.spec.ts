import { MessageService } from "./message.service";

describe('Message Service',()=>{
    let service : MessageService;
    beforeEach(()=>{
        service = new MessageService();
    })

    it('shouldnt contain any messages after creation',()=>{
        expect(service.messages.length).toBe(0);
    })

    it('should contain messages after add is called',()=>{
        service.add('Message 1');
        expect(service.messages.length).toBe(1);
    })

    it('shouldnt contain any messages once clear is called',()=>{
        service.clear();
        expect(service.messages.length).toBe(0);
    })
})