import Contact from "../models/ContactModel"
import { ApiContacts } from '@/services/Api'

export default class ContactRepository {
    constructor() {
        this.contactsEndpoint = 'contacts/';
        this.token = localStorage.token;
        this.headers = {
            Authorization: 'Token ' + localStorage.token,
        }
    }

    async getContacts(url = null) {
        if (url == null) {
            url = this.contactsEndpoint;
        }
        let response = await ApiContacts.get(url, {
            headers: this.headers
        });
        if (response.status == 200) {
            return response.data;
        }
        else return response;
    }

    async addContact(data) {
        let response = await ApiContacts.post(this.contactsEndpoint, data, {
            headers: this.headers
        });
        if (response.status == 201) {
            let contact = new Contact({
                id: response.data.id,
                name: response.data.name,
                telephone: response.data.telephone,
            });
            return contact;
        }
        else return response;
    }

    async editContact(contactId, data) {
        let response = await ApiContacts.put(this.contactsEndpoint + `${contactId}/`, data, {
            headers: this.headers
        });

        if (response.status == 200) {
            let contact = new Contact({
                id: response.data.id,
                name: response.data.name,
                telephone: response.data.telephone,
            });
            return contact;
        }
        else return response;
    }

    async deleteContact(contactId) {
        let response = await ApiContacts.delete(this.contactsEndpoint + `${contactId}`, {
            headers: this.headers
        });
        if (response.status == 204) {
            return true;
        }
        else return response;
    }
}