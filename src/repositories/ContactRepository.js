import Contact from "../models/ContactModel"

export class ContactRepository {
    constructor() {
        this.apiBase = '';
    }

    async getContacts(userId) {
        userId;
        return [
            new Contact(1, 'Rafael', '88999034444'),
            new Contact(1, 'Francisco', '88999034443'),
        ];
    }
}