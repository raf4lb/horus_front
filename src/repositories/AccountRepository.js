import User from '@/models/UserModel'
import { ApiAuth, ApiContacts } from '@/services/Api'


export default class AccountRepository {
    constructor() {
        this.token = localStorage.token;
        this.userAuthenticated = null;
        // this.userAuthenticated = new User(
        //     2,
        //     'Horus Aeronaves',
        //     'contato@horusaeronaves.com',
        // )
    }

    async login(username, password) {
        // await new Promise((resolve) => { setTimeout(resolve, 500) });        
        let response = await ApiAuth.post('token/', {
            username: username,
            password: password
        });
        if (response.status == 200) {
            if (response.data.hasOwnProperty('token')) {
                localStorage.setItem('token', response.data.token);
                this.token = localStorage.token;
                return localStorage.token;
            }
            else {
                return null;
            }
        }
        return null;

    }

    async logout() {
        localStorage.removeItem('token');
    }

    async isAuthenticated() {
        if (localStorage.token) return true;
        return false;
    }

    async getUserAuthenticated() {
        if (await this.isAuthenticated()) {
            let response = await ApiAuth.get('user-info/', {
                headers: {
                    Authorization: `Token ${this.token}`,
                }
            });
            if (response.status == 200) {
                this.userAuthenticated = response.data;
                return this.userAuthenticated;
            }
            return null;
        }
        return null;
    }
}