<?php

Imports("MVC.controller");

/**
 * 用户访问权限控制器
*/
class accessController extends controller {

    public function accessControl() {       
        if ($this->AccessByEveryOne()) {
            return true;
        }

        if (!empty($_SESSION)) {
            if (array_key_exists("user", $_SESSION)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 假若没有权限的话，会执行这个函数进行重定向
    */
    public function Redirect() {
        $url = urlencode($_SERVER["REQUEST_URI"]);
        Redirect("{<platform>passport/portal}&back=$url");
    }   
}
?>