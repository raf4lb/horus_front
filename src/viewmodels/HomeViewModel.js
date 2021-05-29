import AccountRepository from "@/repositories/AccountRepository"
import ContactRepository from "@/repositories/ContactRepository";


export default class HomeViewModel {
    constructor() {
        this.user = null;
        this.contacts = [];
        this.selectedContact = null;
        this.inputName = '';
        this.inputTelephone = '';
        this.errorDeletingContact = false;
        this.errorEditingContact = false;
        this.isFormValid = true;
        this.formErrors = [];
        this.isLoading = true;
        this.isEditing = false;
        this.selectedContact = null;
        this.selectedContactIndex = null;
        this.isAuthenticated = false;
        this.accountRepository = new AccountRepository();
        this.contactRepository = new ContactRepository();
    }

    async isAuthenticated() {
        this.isAuthenticated = await this.accountRepository.isAuthenticated();
    }

    async getUserAuthenticated() {
        this.user = await this.accountRepository.getUserAuthenticated();
        return this.user;
    }

    async logout() {
        await this.accountRepository.logout();
    }

    async getContacts() {
        this.isLoading = true;
        this.contacts = await this.contactRepository.getContacts(this.user.id);
        this.isLoading = false;
    }

    async addContact() {
        this.isFormValid = this.validateForm();
        if (this.isFormValid) {
            this.contacts.push({
                id: 4,
                name: this.inputName,
                telephone: this.inputTelephone,
            });
        }
    }

    editingContact(contactId) {
        let contact = this.contacts.find((element) => element.id == contactId);
        this.inputName = contact.name;
        this.inputTelephone = contact.telephone;
        this.editing = true;
        this.selectedContact = contact;
        let index = this.contacts.findIndex((element) => element.id == contactId);
        this.selectedContactIndex = index;
        // console.log("editing " + contact.name);

    }

    async editContact() {
        // console.log("edit " + this.selectedContact.name);
        this.isFormValid = this.validateForm();
        if (this.isFormValid) {
            const contactId = this.selectedContact.id;
            let data = {
                id: contactId,
                name: this.inputName,
                telephone: this.inputTelephone,
            }
            let contact = await this.contactRepository.editContact(contactId, data);
            this.contacts[this.selectedContactIndex] = contact;
            this.cancelEditContact();
        }
    }

    cancelEditContact() {
        this.editing = false;
        this.inputName = '';
        this.inputTelephone = '';
    }

    async deleteContact(contactId) {
        this.cancelEditContact();
        let index = this.contacts.findIndex((element) => element.id == contactId);
        let deleted = await this.contactRepository.deleteContact(contactId);
        if (deleted) {
            this.contacts.splice(index, 1);
            this.errorDeletingContact = false;
        } else {
            this.errorDeletingContact = true;
        }
    }

    validateForm() {
        this.formErrors = [];
        if (this.inputName === '') this.formErrors.push('Campo nome não pode ser vazio');
        if (this.inputTelephone === '') this.formErrors.push('Campo telefone não pode ser vazio');
        if (isNaN(this.inputTelephone)) this.formErrors.push('Campo telefone deve conter apenas números');
        if (this.inputTelephone.length != 11) this.formErrors.push('Campo telefone inválido');

        if (this.formErrors.length > 0) return false;
        else return true;
    }
}