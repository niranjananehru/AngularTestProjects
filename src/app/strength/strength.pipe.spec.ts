import { StrengthPipe } from "./strength.pipe";

describe('Strength Pipe',()=>{
    it('should return weak if value is 5',()=>{
        let strengthPipe = new StrengthPipe();
        expect(strengthPipe.transform(5)).toEqual("5 (weak)"); 
    })

    it('should return strong if value is 13',()=>{
        let strengthPipe = new StrengthPipe();
        expect(strengthPipe.transform(13)).toEqual("13 (strong)"); 
    })
})