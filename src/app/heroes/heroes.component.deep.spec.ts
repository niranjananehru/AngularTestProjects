import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { Directive,Input } from '@angular/core';

@Directive({
    selector : '[routerLink]',
    host : { '(click)' : 'onClick()'}

})
export class routerLinkDirectiveStub{
    @Input('routerLink') linkParams : any;
    naviagtedTo : any = null;

    onClick(){
        this.naviagtedTo = this.linkParams;
    }
}

describe('Heroes Component (Deep Test)',()=>{
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService : HeroService; 
    let HEROES; 
    beforeEach(()=>{
        HEROES = [
            { id : 1,name : 'Wonder Woman',strength : 4},
            { id : 2,name : 'Super Woman',strength : 14},
            { id : 3,name : 'Super dude',strength : 40}
        ];
        let mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        
        TestBed.configureTestingModule({
            declarations : [
                HeroesComponent,
                HeroComponent,
                routerLinkDirectiveStub
            ],
            providers : [
                {provide : HeroService , useValue : mockHeroService}
            ],
            //schemas : [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
    })

    it('should render Hero as HeroesComponent',()=>{
        const dgEle = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(dgEle[0].componentInstance.hero.name).toEqual('Wonder Woman');
    })

    it(`should call delete Hero when Hero Component's 
        delete button is clicked `,()=>{
        spyOn(fixture.componentInstance, 'delete');
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        //heroComponents[0].query(By.css('button')).triggerEventHandler('click',{stopPropagation :()=>{}}); //this line executes click event on html 
        //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined); // Use Child Component to raise delete event 
        heroComponents[0].triggerEventHandler('delete',null);
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it('should add New Hero to the Hero list when add button is clicked',()=>{
        const name =" Mr.Ice";
        //mockHeroService.addHero(undefined).
        //mockHeroService.addHero.arguments = null;
        //mockHeroService.addHero.and.returnValue(of());

    });

    it('should set the route correctly for first hero',()=>{
        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLinkDE = heroComponentsDEs[0].query(By.directive(routerLinkDirectiveStub)).injector.get(routerLinkDirectiveStub);
        heroComponentsDEs[0].query(By.css('a')).triggerEventHandler('click',null);
        expect(routerLinkDE.naviagtedTo).toBe('/detail/1');
    })

})