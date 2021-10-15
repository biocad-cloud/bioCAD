<?php

include "../bootstrap.php";

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