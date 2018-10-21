import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('Heroes Component',()=>{
    let heroesCmp : HeroesComponent;
    let Heroes;
    let mockHeroService; 

    beforeEach(()=>{
        Heroes =[
            {id :1,name :'Hero 1',strength : 4},
            {id :2,name :'Hero 2',strength : 14},
            {id :3,name :'Hero 3',strength : 24}
        ];        
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        heroesCmp = new HeroesComponent(mockHeroService);
    })

    it('should delete a hero when delete fn is called',()=>{
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroesCmp.heroes = Heroes;
        heroesCmp.delete(Heroes[2]);
        expect(heroesCmp.heroes.length).toBe(2);
    })
})
