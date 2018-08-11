namespace login_script {

    export class user {

        public account: string;
        public password: string;

        constructor(account: string, password: string, md5: (input: string) => string) {
            this.account = account;
            this.password = md5(password);
        }

        public login(api: string): msg {
            var xhr = new XMLHttpRequest();

            xhr.open("POST", api, false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                login: this.account,
                password: this.password
            }));

            var response = xhr.responseText;
            var data: msg = JSON.parse(response);

            return data;
        }
    }

    export class msg {

        public code: number;
        public msg: string;
        public url: string;

        public get success(): boolean {
            return this.code == 0;
        }
    }

    export class registerDiv {

        public username: string;
        public email: string;
        public password: string;
        public checkTermsOfuse: string;

        public constructor(username: string, email: string, password: string, check: string) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.checkTermsOfuse = check;
        }
    }

    export function register(
        api: string,
        md5: (input: string) => string,
        divId: registerDiv = new registerDiv("username", "email", "password", "check_terms_of_use")): msg {

        var username: string = (<HTMLInputElement>document.getElementById(divId.username)).value;
        var email: string = (<HTMLInputElement>document.getElementById(divId.email)).value;
        var password: string = (<HTMLInputElement>document.getElementById(divId.password)).value;

        if (!(<HTMLInputElement>document.getElementById(divId.checkTermsOfuse)).checked) {
            var message: msg = new msg();

            message.code = -1;
            message.url = "#";
            message.msg = "You should agree our bioCAD Terms of use at first!";

            return message;
        } else if (!username || !email || !password) {
            var message: msg = new msg();

            message.code = -2;
            message.url = "#";
            message.msg = "One of the required field is empty!";

            return message;
        }

        var xhr = new XMLHttpRequest();

        xhr.open("POST", api, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: username,
            password: md5(password),
            email: email
        }));

        var response = xhr.responseText;
        var data: msg = JSON.parse(response);

        return data;
    }
}