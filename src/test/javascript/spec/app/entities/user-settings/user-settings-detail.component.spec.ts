/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TwentyOnePointsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserSettingsDetailComponent } from '../../../../../../main/webapp/app/entities/user-settings/user-settings-detail.component';
import { UserSettingsService } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.service';
import { UserSettings } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.model';

describe('Component Tests', () => {

    describe('UserSettings Management Detail Component', () => {
        let comp: UserSettingsDetailComponent;
        let fixture: ComponentFixture<UserSettingsDetailComponent>;
        let service: UserSettingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [UserSettingsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserSettingsService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserSettingsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserSettings(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userSettings).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
