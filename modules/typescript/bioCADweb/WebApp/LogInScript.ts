namespace bioCAD.WebApp {

    export class LogInScript extends Bootstrap {

        public get appName(): string {
            return "login";
        }

        protected init(): void {
            $ts("#login").onclick = LogInScript.login;
        }

        static login() {
            var account: string = $ts("#username").CType<HTMLInputElement>().value;
            var password: string = $ts("#password").CType<HTMLInputElement>().value;
            var api: string = <any>$ts("@api:login");

            $ts.post(api, {
                account: account, password: md5(password)
            }, result => {
                if (result.code == 0) {
                    var query = $ts.windowLocation().getArgument("goto", true, "/");
                    var back = decodeURIComponent(query);

                    if (Strings.Empty(back, true)) {
                        (<any>parent).gotoURL("/");
                    } else {
                        (<any>parent).gotoURL(back);
                    }
                } else {
                    (<any>parent).msgbox(result.info, 1);
                }
            });
        }

        public static register(
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
}