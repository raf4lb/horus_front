import AccountRepository from "../repositories/AccountRepository";

export default class LoginViewModel {
    constructor(view) {
        this.view = view;
        this.repository = new AccountRepository();
    }

    async login() {
        try {
            let token = await this.repository.login(this.view.username, this.view.password);
            if (token == null) {
                this.view.isInvalid = true;
            }
            else {
                this.view.isInvalid = false;
            }
            return token;
        }
        catch (error) {
            this.view.isInvalid = true;
        }
    }
}