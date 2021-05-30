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

    async getContacts() {
        try {
            let response = await ApiContacts.get(this.contactsEndpoint, {
                headers: this.headers
            });
            if (response.status == 200) {
                return response.data.results;
            }
            else return null;
        }
        catch (error) {
            return error;
        }
    }

    async addContact(data) {
        try {
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
            else return response.status;
        }
        catch (error) {
            return error;
        }
    }

    async editContact(contactId, data) {
        let response = await ApiContacts.put(this.contactsEndpoint + `${contactId}/`, data, {
            headers: this.headers
        });
        try {
            if (response.status == 200) {
                let contact = new Contact({
                    id: response.data.id,
                    name: response.data.name,
                    telephone: response.data.telephone,
                });
                return contact;
            }
            else return response.status;
        }
        catch (error) {
            return error;
        }
    }

    async deleteContact(contactId) {
        try {
            let response = await ApiContacts.delete(this.contactsEndpoint + `${contactId}`, {
                headers: this.headers
            });
            if (response.status == 204) {
                return true;
            }
            else return false;
        }
        catch (error) {
            return error;
        }
    }
}