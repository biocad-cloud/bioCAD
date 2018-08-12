<?php

session_start();

define("APP_PATH", dirname(dirname(__FILE__)));
define("APP_DEBUG", true);

include "../modules/dotnet/package.php";
include "../common.php";

Imports("MVC.view");
Imports("MVC.router");

View::Push("dismiss_banner", Common::BannerDismissStatus());
View::Push("*", Common::getUserInfo());

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new app(), APP_PATH . "/html/user/");

class app {

    public function index() {
        Redirect("{<platform>passport/portal}&type=login");
    }

    public function portal() {
        $type = Utils::ReadValue($_GET, "type", "login");
        $vars = [
            "title"  => "bioCAD Passport Portal", 
            "iframe" => "{<platform>passport/$type}"
        ];

        View::Show(APP_PATH . "/html/login.html", $vars);
    }

	public function login() {
		View::Display(["title" => "Login"]);
	}

    public function register() {
        View::Display(["title" => "register"]);
    }

    public function recover() {
        View::Display(["title" => "recover"]);
    }
}
?>