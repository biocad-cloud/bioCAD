/// <reference path="linq.d.ts" />
declare namespace bioCAD.WebApp {
    class LogInScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        static login(): void;
    }
    class RegisterScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        static register(): void;
    }
}
