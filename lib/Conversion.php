<?php 

class Conversion {

    public static function CInt($str) {
        return intval($str);
    }

    public static function CDbl($str) {
        return doubleval($str);
    }

    public static function CBool($str) {
        return boolval($str);
    }

    public static function CStr($str) {

    }

    public static function CSng($str) {
        return floatval($str);
    }

}

?>