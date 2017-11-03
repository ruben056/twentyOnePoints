import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserSettings } from './user-settings.model';
import { UserSettingsPopupService } from './user-settings-popup.service';
import { UserSettingsService } from './user-settings.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-settings-dialog',
    templateUrl: './user-settings-dialog.component.html'
})
export class UserSettingsDialogComponent implements OnInit {

    userSettings: UserSettings;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userSettingsService: UserSettingsService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userSettings.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userSettingsService.update(this.userSettings));
        } else {
            this.subscribeToSaveResponse(
                this.userSettingsService.create(this.userSettings));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserSettings>) {
        result.subscribe((res: UserSettings) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserSettings) {
        this.eventManager.broadcast({ name: 'userSettingsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-settings-popup',
    template: ''
})
export class UserSettingsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userSettingsPopupService: UserSettingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userSettingsPopupService
                    .open(UserSettingsDialogComponent as Component, params['id']);
            } else {
                this.userSettingsPopupService
                    .open(UserSettingsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
