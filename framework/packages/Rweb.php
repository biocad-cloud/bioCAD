<?php

define("RWEB", "http://172.18.123.247:8847");

class RWeb {

    /**
     * Proxy method for call package module
     * 
     * @param $app the script name
     * @param $args the parameter arguments, GET/POST
     * 
    */
    public static function run($app, $args) {
        include_once __DIR__ . "/Rscript/$app.php";
        return (new \biocad\Rscript())->exec($args);
    }

    public static function exec($app, $url_query) {
        $url_query = self::urlQuery($url_query);
        $url       = RWEB . "/{$app}?{$url_query}";
        $html      = \file_get_contents($url);

        return $html;
    }

    private static function urlQuery($args) {
        $kv = [];

        foreach($args as $name => $val) {
            $val = urlencode($val);
            array_push($kv, "$name=$val");
        }

        return implode("&", $kv);
    }
}