/// <reference path="linq.d.ts" />
declare namespace login_script {
    class user {
        account: string;
        password: string;
        constructor(account: string, password: string, md5: (input: string) => string);
        login(api: string): msg;
    }
    class msg {
        code: number;
        msg: string;
        url: string;
        readonly success: boolean;
    }
    class registerDiv {
        username: string;
        email: string;
        password: string;
        checkTermsOfuse: string;
        constructor(username: string, email: string, password: string, check: string);
        static DefaultId(): registerDiv;
    }
    function login(api: string, md5: (input: string) => string, divId?: registerDiv): msg;
    function register(api: string, md5: (input: string) => string, divId?: registerDiv): msg;
}
