<?php

imports("MVC.controller");
imports("RFC7231.logger");
imports("RFC7231.index");

/**
 * record user activity for application 
 * usage data analysis
*/
class usageLogger implements logger {

    function __construct() {

    }

    public function log($code, $message) {
        $uri = $_SERVER["REQUEST_URI"];
        $ipv4 = Utils::UserIPAddress();

        if (is_bool($message)) {
            $result = $message;
            $message = "";
        } else {
            $result = $code == 200;
        }

        $user_activity = new Table("user_activity");
        $d = $user_activity->add([
            "ssid" => session_id(),
            "ip" => $ipv4,
            "api" => $uri,
            "method" => $_SERVER["REQUEST_METHOD"],
            "status_code" => $code,
            "time" => Utils::Now(),
            "message" => $message
        ]);

        if ($d == false) {
            breakpoint($user_activity->getLastMySql());
        }

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
            return $this->logger->log(200, true);
        }

        if (!empty($_SESSION)) {
            if (array_key_exists("user", $_SESSION)) {
                return $this->logger->log(200, true);
            }
        }

        return $this->logger->log(403, false);
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