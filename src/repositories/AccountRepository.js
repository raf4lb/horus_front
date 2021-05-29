export default class AccountRepository {
    constructor() {
        this.apiBase = '';
    }

    async login(username, password) {
        await new Promise((resolve) => { setTimeout(resolve, 1000) });
        if (username == 'rafael' && password == '123') {
            return 'ABC1234';
        }
        else {
            return null;
        }
    }
}