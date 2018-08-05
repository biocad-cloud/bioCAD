<?php

Imports("MVC.controller");

class accessController extends controller {

    public function accessControl() {       
        if ($this->AccessByEveryOne()) {
            return true;
        }

        return false;
    }

    /**
     * 假若没有权限的话，会执行这个函数进行重定向
    */
    public function Redirect() {
        Redirect("{<platform>passport/portal}");
    }   
}
?>