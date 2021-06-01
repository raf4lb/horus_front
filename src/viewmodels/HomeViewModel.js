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
        this.hasError = false;
        this.errors = [];
        this.notifications = [];
        this.isLoading = true;
        this.isEditing = false;
        this.selectedContact = null;
        this.selectedContactIndex = null;
        this.isAuthenticated = false;
        this.previousUrl = null;
        this.nextUrl = null;
        this.accountRepository = new AccountRepository();
        this.contactRepository = new ContactRepository();
        this.paginationSize = 10;
    }

    async isAuthenticated() {
        this.isAuthenticated = await this.accountRepository.isAuthenticated();
    }

    async getUserAuthenticated() {
        try {
            this.user = await this.accountRepository.getUserAuthenticated();
            return this.user;
        }
        catch (error) {
            if (error.response.status == 401) this.logout();
        }
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
            this.clearErrors();
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
                this.clearErrors();
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
                this.clearErrors();
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
        this.validateForm();
        if (!this.hasError) {
            try {
                let data = {
                    owner: this.user.id,
                    name: this.inputName,
                    telephone: this.inputTelephone,
                }
                let response = await this.contactRepository.addContact(data);
                if (response instanceof Contact) {
                    this.clearForm()
                    this.getContacts();
                    this.clearErrors();
                    this.addNotification('Contato adicionado.')
                }
                else {
                    this.hasError = true;
                    this.errors.push('Não foi possível adicionar o contato.');
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

    editingContact(contactId) {
        this.selectContact(contactId);
        this.inputName = this.selectedContact.name;
        this.inputTelephone = this.selectedContact.telephone;
        this.isEditing = true;
    }

    async editContact() {
        this.validateForm();
        if (!this.hasError) {
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
                    this.getContacts();
                    this.cancelEditContact();
                    this.clearErrors();
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

    clearForm() {
        this.isEditing = false;
        this.inputName = '';
        this.inputTelephone = '';
    }

    cancelEditContact() {
        this.clearForm();
        this.clearErrors();
        this.clearSelectedContact();
    }

    deletingContact(contactId) {
        this.selectContact(contactId);
    }

    async deleteContact() {
        let deleted = await this.contactRepository.deleteContact(this.selectedContact.id);
        if (deleted) {
            this.contacts.splice(this.selectedContactIndex, 1);
            this.getContacts();
            this.clearErrors();
            this.addNotification('Contato excluído');
        } else {
            this.hasError = true;
            this.errors.push('Não foi possível excluir o contato.');
        }
    }

    validateForm() {
        this.hasError = false;
        this.errors = [];
        if (this.inputName == '') this.errors.push('Campo nome não pode ser vazio');
        if (this.inputTelephone == '') this.errors.push('Campo telefone não pode ser vazio');
        else if (isNaN(this.inputTelephone)) this.errors.push('Campo telefone deve conter apenas números');
        else if (this.inputTelephone.length != 11) this.errors.push('Campo telefone inválido');

        if (this.errors.length > 0) this.hasError = true;
        else this.hasError = false;
    }

    selectContact(contactId) {
        let contact = this.contacts.find((element) => element.id == contactId);
        this.selectedContact = contact;
        let index = this.contacts.findIndex((element) => element.id == contactId);
        this.selectedContactIndex = index;
    }

    clearSelectedContact() {
        this.selectedContactIndex = null;
        this.selectedContact = null;
    }

    clearErrors() {
        this.hasError = false;
        this.errors = [];
    }

    addNotification(text) {
        // this.notifications.push(text);
        // let index = this.notifications.findIndex(text);
        // setTimeout(() => {
        //     this.notifications.splice(index, 1);
        // },
        //     5000,
        // )
    }
}