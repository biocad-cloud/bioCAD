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
}