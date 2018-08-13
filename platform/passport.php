<?php

session_start();

define("APP_PATH", dirname(dirname(__FILE__)));
define("APP_DEBUG", true);

include "../modules/dotnet/package.php";
include "../common.php";
include "../accessController.php";

Imports("MVC.view");
Imports("MVC.router");

View::Push("dismiss_banner", Common::BannerDismissStatus());
View::Push("*", Common::getUserInfo());

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new app(), APP_PATH . "/html/user/", new accessController());

/**
 * 用户登录界面
*/
class app {

    public function index() {
        Redirect("{<platform>passport/portal}&type=login");
    }

    /**
     * bioCAD Passport Portal
     * 
     * @access *
     * @uses view
    */
    public function portal() {
        $type = Utils::ReadValue($_GET, "type", "login");

        View::Show(APP_PATH . "/html/login.html", [
            "iframe" => "{<platform>passport/$type}"
        ]);
    }

    /**
     * Login
     * 
     * @access *
     * @uses view
    */
	public function login() {
		View::Display();
	}

    /**
     * Register
     * 
     * @access *
     * @uses view
    */
    public function register() {
        View::Display();
    }

    /**
     * Recover
     * 
     * @access *
     * @uses view
    */
    public function recover() {
        View::Display();
    }
}
?>