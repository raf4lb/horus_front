import User from '@/models/UserModel'

export default class AccountRepository {
    constructor() {
        this.apiBase = '';
        this.userAuthenticated = new User(
            1,
            'Horus Aeronaves',
            'contato@horusaeronaves.com',
        )
    }

    async login(username, password) {
        await new Promise((resolve) => { setTimeout(resolve, 500) });
        if (username == 'rafael' && password == '123') {
            localStorage.setItem('token', 'ABC1234');
            return localStorage.token;
        }
        else {
            return null;
        }
    }

    async logout() {
        await new Promise((resolve) => { setTimeout(resolve, 500) });
        localStorage.removeItem('token');
    }

    async isAuthenticated() {
        await new Promise((resolve) => { setTimeout(resolve, 500) });
        if (localStorage.token) return true;
        return false;
    }

    async getUserAuthenticated() {
        if (await this.isAuthenticated()) return this.userAuthenticated;
        return null;

    }
}