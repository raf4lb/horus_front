import AccountRepository from "@/repositories/AccountRepository"
import ContactRepository from "@/repositories/ContactRepository";
import Contact from "../models/ContactModel";


export default class HomeViewModel {
    constructor() {
        this.user = null;
        this.contacts = [];
        this.selectedContact = null;
        this.inputName = '';
        this.inputTelephone = '';
        this.hasError = true;
        this.errors = [];
        this.isLoading = true;
        this.isEditing = false;
        this.selectedContact = null;
        this.selectedContactIndex = null;
        this.isAuthenticated = false;
        this.previousUrl = null;
        this.nextUrl = null;
        this.accountRepository = new AccountRepository();
        this.contactRepository = new ContactRepository();
    }

    async isAuthenticated() {
        this.isAuthenticated = await this.accountRepository.isAuthenticated();
    }

    async getUserAuthenticated() {
        this.user = await this.accountRepository.getUserAuthenticated();
        // console.log(this.user);
        return this.user;
    }

    async logout() {
        await this.accountRepository.logout();
    }

    async getContacts() {
        this.isLoading = true;
        try {
            let response = await this.contactRepository.getContacts();
            this.contacts = response.results;
            this.previousUrl = response.previous;
            this.nextUrl = response.next;
        }
        catch (error) {
            if (error.response.status == 400) {
                this.hasError = false;
                this.errors.push('Erro ao carregar contatos');
            }
        }
        this.isLoading = false;
    }

    async getPreviousContacts() {
        if (this.previousUrl != null) {
            try {
                let response = await this.contactRepository.getContacts(this.previousUrl);
                this.contacts = response.results;
                this.previousUrl = response.previous;
                this.nextUrl = response.next;
            }
            catch (error) {
                if (error.response.status == 400) {
                    this.hasError = false;
                    this.errors.push('Erro ao carregar contatos');
                }
            }
            this.isLoading = false;
        }
    }
    async getNextContacts() {
        if (this.nextUrl != null) {
            try {
                let response = await this.contactRepository.getContacts(this.nextUrl);
                this.contacts = response.results;
                this.previousUrl = response.previous;
                this.nextUrl = response.next;
            }
            catch (error) {
                if (error.response.status == 400) {
                    this.hasError = false;
                    this.errors.push('Erro ao carregar contatos');
                }
            }
            this.isLoading = false;
        }
    }

    async addContact() {
        this.hasError = this.validateForm();
        if (this.hasError) {
            try {
                let data = {
                    owner: this.user.id,
                    name: this.inputName,
                    telephone: this.inputTelephone,
                }
                let response = await this.contactRepository.addContact(data);
                if (response instanceof Contact) this.contacts.push(response);
                else {
                    this.hasError = false;
                    this.errors.push(response);
                }
            }
            catch (error) {
                if (error.response.status == 400) {
                    this.hasError = false;
                    this.errors.push('Este telefone já está salvo na sua lista de contatos.');
                }
            }
        }
    }

    editingContact(contactId) {
        let contact = this.contacts.find((element) => element.id == contactId);
        this.inputName = contact.name;
        this.inputTelephone = contact.telephone;
        this.isEditing = true;
        this.selectedContact = contact;
        let index = this.contacts.findIndex((element) => element.id == contactId);
        this.selectedContactIndex = index;
        // console.log("editing " + contact.name);

    }

    async editContact() {
        // console.log("edit " + this.selectedContact.name);
        this.hasError = this.validateForm();
        if (this.hasError) {
            const contactId = this.selectedContact.id;
            let data = {
                owner: this.user.id,
                id: contactId,
                name: this.inputName,
                telephone: this.inputTelephone,
            }
            try {
                let response = await this.contactRepository.editContact(contactId, data);
                if (response instanceof Contact) {
                    this.contacts[this.selectedContactIndex] = response;
                    this.contacts.sort((a, b) => a.name.localeCompare(b.name)); // Sorting
                    this.cancelEditContact();
                }
                else {
                    this.hasError = true;
                    this.errors.push('Não foi possível editar o contato.');
                }

            }
            catch (error) {
                if (error.response.status == 400) {
                    this.hasError = true;
                    this.errors.push('Este telefone já está salvo na sua lista de contatos.');
                }
            }

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
        this.errors = [];
        if (this.inputName === '') this.errors.push('Campo nome não pode ser vazio');
        if (this.inputTelephone === '') this.errors.push('Campo telefone não pode ser vazio');
        if (isNaN(this.inputTelephone)) this.errors.push('Campo telefone deve conter apenas números');
        if (this.inputTelephone.length != 11) this.errors.push('Campo telefone inválido');

        if (this.errors.length > 0) return false;
        else return true;
    }

}