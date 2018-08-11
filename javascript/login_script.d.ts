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
    }
    function register(api: string, md5: (input: string) => string, divId?: registerDiv): msg;
}
