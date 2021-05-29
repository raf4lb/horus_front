import Contact from "../models/ContactModel"
import { API } from '@/services/Api'

export default class ContactRepository {
    constructor() {
        this.contactsEndpoint = 'contacts';
        this.contacts = [
            // new Contact({ id: 1, name: 'Rafael', telephone: '88999034444' }),
            // new Contact(2, 'Francisco', '88999034443'),
            // new Contact(3, 'Antônio', '88999034442'),
        ];
    }

    async getContacts(userId) {
        // await new Promise((resolve) => { setTimeout(resolve, 500) });
        let response = await API.get(this.contactsEndpoint);
        this.contacts = response.data.results;
        return this.contacts;
    }

    async editContact(contactId, data) {
        await new Promise((resolve) => { setTimeout(resolve, 500) });
        return data;
    }

    async deleteContact(contactId) {
        await new Promise((resolve) => { setTimeout(resolve, 500) });
        return true;
    }
}