import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('UserSettings e2e test', () => {

    let navBarPage: NavBarPage;
    let userSettingsDialogPage: UserSettingsDialogPage;
    let userSettingsComponentsPage: UserSettingsComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserSettings', () => {
        navBarPage.goToEntity('user-settings');
        userSettingsComponentsPage = new UserSettingsComponentsPage();
        expect(userSettingsComponentsPage.getTitle()).toMatch(/twentyOnePointsApp.userSettings.home.title/);

    });

    it('should load create UserSettings dialog', () => {
        userSettingsComponentsPage.clickOnCreateButton();
        userSettingsDialogPage = new UserSettingsDialogPage();
        expect(userSettingsDialogPage.getModalTitle()).toMatch(/twentyOnePointsApp.userSettings.home.createOrEditLabel/);
        userSettingsDialogPage.close();
    });

    it('should create and save UserSettings', () => {
        userSettingsComponentsPage.clickOnCreateButton();
        userSettingsDialogPage.setWeeklyGoalInput('5');
        expect(userSettingsDialogPage.getWeeklyGoalInput()).toMatch('5');
        userSettingsDialogPage.userSelectLastOption();
        userSettingsDialogPage.save();
        expect(userSettingsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserSettingsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-settings div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserSettingsDialogPage {
    modalTitle = element(by.css('h4#myUserSettingsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    weeklyGoalInput = element(by.css('input#field_weeklyGoal'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWeeklyGoalInput = function (weeklyGoal) {
        this.weeklyGoalInput.sendKeys(weeklyGoal);
    }

    getWeeklyGoalInput = function () {
        return this.weeklyGoalInput.getAttribute('value');
    }

    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
