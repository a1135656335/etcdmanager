const BasePage = require('./base_page');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

class ManageKeysPage extends BasePage {
    constructor(app = undefined) {
        super(app);
    }

    async filterKeys(value) {
        return await this.writeInput(
            'input[data-test="key-manager.help.text-field"]',
            value
        );
    }

    async clickKeyMenu() {
        await this.app.client.waitUntilTextExists(
            'div[data-test="menu.keys.list-tile-title"]',
            'Manage keys'
        );
        return this.app.client.click(
            'div[data-test="menu.keys.list-tile-title"]'
        );
    }

    async findListTitle() {
        return await this.app.client.waitUntilTextExists(
            'div[data-test="key-manager.help.toolbar-title"]',
            'Keys'
        );
    }

    async isNewRowExists(key, value) {
        await this.app.client.waitUntilTextExists(
            'td[data-test="key-manager.props-item-key.td"]',
            key
        );
        return await this.app.client.waitUntilTextExists(
            'td[data-test="key-manager.props-item-value.td"]',
            value
        );
    }

    async openDeleteDialog() {
        await this.app.client
            .$('tr*=testKey')
            .$('i[data-test="key-manager.actions-remove.icon"]')
            .click();

        return await this.app.client.waitUntilTextExists(
            'div[data-test="delete-dialog.title.toolbar-title"]',
            'Attention!'
        );
    }

    async openEditor() {
        return await this.app.client
            .$('i[data-test="key-manager.actions-edit.icon"]')
            .click();
    }

    async clickDeleteDialogOk() {
        await this.app.client.click(
            'button[data-test="delete-dialog.actions-remove.button"]'
        );

        await this.waitUntilDisplayed(
            'div[data-test="app.message.snackbar"]'
        );

        await this.app.client
        .waitUntilTextExists('div.v-snack__content','Operation successful',20000);

        return this.app.client.$('div.v-snack__content').getText().then(text =>{
                chai.expect(text).to.have.contains('Operation successful');
             }); 
    }

    async clickEditorCloseBtn() {
        return await this.app.client.click(
            'button[data-test="key-editor.close.button"]'
        );
    }

    clickSubmitBtn() {
        return this.app.client.click(
            'button[data-test="config.submit.button"]'
        );
    }

    clickAddBtn() {
        return this.app.client.click(
            'span[data-test="key-manager.create-label.span"]'
        );
    }

    async writeKey(value) {
        return await this.writeInput(
            'input[data-test="key-editor.key.text-field"]',
            value
        );
    }

    async writeValue(value) {

        return await this.writeInput(
            'input[data-test="key-editor.value.text-field"]',
            value
        );
    }

    async clickAddKeyBtn() {
        await this.app.client.click(
            'button[data-test="key-editor.submit.button"]'
        );
       return await this.app.client
            .waitUntilTextExists('div.v-snack__content','Operation successful',10000);
       }

    async clickKeyCheckBox(){

        return await this.app.client
        .$('//div[@data-test="key-manager.props-selected.chechbox"]//div[contains(@class,"controls__ripple")]')
        .click();
    }
    
    async clickRemoveBtn(){
        return await this.app.client.click('button[data-test="key-manager.removeAll.button"]')
    }
}

module.exports = ManageKeysPage;
