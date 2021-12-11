<?php

imports("MVC.controller");
imports("RFC7231.logger");

/**
 * record user activity for application 
 * usage data analysis
*/
class usageLogger extends logger {

    public function log($code, $message) {
        $uri = $_SERVER["REQUEST_URI"];
        $ipv4 = Utils::UserIPAddress();

        (new Table("user_activity"))->add([
            "ssid" => session_id(),
            "ip" => $ipv4,
            "api" => $uri,
            "method" => $_SERVER["REQUEST_METHOD"],
            "status_code" => $code,
            "time" => Utils::Now(),
            "message" => $msg
        ]);

        return $result;
    }
}

/**
 * 用户访问权限控制器
*/
class accessController extends controller {

    /**
     * @var usageLogger
    */
    private $logger;

    function __construct() {
        parent::__construct();

        # set callback handler
        \RFC7231Error::$logger = $this->logger = new usageLogger();
    }

    public function accessControl() {       
        if ($this->AccessByEveryOne()) {
            return $this->log(200, true);
        }

        if (!empty($_SESSION)) {
            if (array_key_exists("user", $_SESSION)) {
                return $this->log(200, true);
            }
        }

        return $this->log(403, false);
    }

    /**
     * 假若没有权限的话，会执行这个函数进行重定向
    */
    public function Redirect($code) {
        $url = urlencode(Utils::URL());
        $url = "{<platform>passport/portal}&goto=$url";

        \Redirect($url);
    }   
}