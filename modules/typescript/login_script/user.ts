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
            var formData = new FormData();

            formData.append("account", this.account);
            formData.append("password", this.password);

            xhr.open("POST", api, false);
            xhr.send(formData);

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

        public static DefaultId(): registerDiv {
            return new registerDiv("username", "email", "password", "check_terms_of_use");
        }
    }

    export function login(
        api: string,
        md5: (input: string) => string,
        divId: registerDiv = registerDiv.DefaultId()): msg {

        var username: string = (<HTMLInputElement>document.getElementById(divId.username)).value;
        var password: string = (<HTMLInputElement>document.getElementById(divId.password)).value;
        var userLogin = new user(username, password, md5);

        return userLogin.login(api);
    }

    export function register(
        api: string,
        md5: (input: string) => string,
        divId: registerDiv = registerDiv.DefaultId()): msg {

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

        // 2018-08-12 php后台不识别json的post数据，必须要发送form数据才行？
        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        formData.append("username", username);
        formData.append("password", md5(password));
        formData.append("email", email);

        xhr.open("POST", api, false);
        xhr.send(formData);

        var response = xhr.responseText;
        var data: msg = JSON.parse(response);

        return data;
    }
}