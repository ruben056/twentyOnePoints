import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointsSharedModule } from '../../shared';
import { TwentyOnePointsAdminModule } from '../../admin/admin.module';
import {
    UserSettingsService,
    UserSettingsPopupService,
    UserSettingsComponent,
    UserSettingsDetailComponent,
    UserSettingsDialogComponent,
    UserSettingsPopupComponent,
    UserSettingsDeletePopupComponent,
    UserSettingsDeleteDialogComponent,
    userSettingsRoute,
    userSettingsPopupRoute,
    UserSettingsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userSettingsRoute,
    ...userSettingsPopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointsSharedModule,
        TwentyOnePointsAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserSettingsComponent,
        UserSettingsDetailComponent,
        UserSettingsDialogComponent,
        UserSettingsDeleteDialogComponent,
        UserSettingsPopupComponent,
        UserSettingsDeletePopupComponent,
    ],
    entryComponents: [
        UserSettingsComponent,
        UserSettingsDialogComponent,
        UserSettingsPopupComponent,
        UserSettingsDeleteDialogComponent,
        UserSettingsDeletePopupComponent,
    ],
    providers: [
        UserSettingsService,
        UserSettingsPopupService,
        UserSettingsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsUserSettingsModule {}
