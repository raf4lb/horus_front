import AccountRepository from "@/repositories/AccountRepository";

export default class LoginViewModel {
    constructor() {
        this.username = "";
        this.password = "";
        this.isInvalid = false;
        this.repository = new AccountRepository();
    }

    async login() {
        try {
            let token = await this.repository.login(this.username, this.password);
            // console.log(token);
            if (token == null) {
                this.isInvalid = true;
            }
            else {
                this.isInvalid = false;
            }
            return token;
        }
        catch (error) {
            this.isInvalid = true;
            return null;
        }
    }
}