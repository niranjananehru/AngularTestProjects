import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/Testing';

describe('Hero Service',()=>{
    let mockMessageService;
    let httpTestingController : HttpTestingController;
    let service : HeroService;

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports : [ HttpClientTestingModule ], 
            providers : [HeroService,
            { provide : MessageService, useValue : mockMessageService}
            ]
        }) ;
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    })

    describe("get Hero",()=>{
        it("should fire a get Request to formed URL to get Hero",()=>{
            service.getHero(3).subscribe();
            const req = httpTestingController.expectOne('api/heroes/3');
            req.flush({id : 4, name : 'Super Dude', strength : 100});
        })
    })
})