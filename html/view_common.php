<?php

class ViewCommon {

    public static function DisplayDropDownMenu($vars) {

        $vars["has_dropdown"]  = "has-dropdown";
        $vars["menu_dropdown"] = View::Load(dirname(__FILE__) . "/includes/menu_dropdown.html");

        return $vars;
    }

    public static function AnonymousUserMenu($vars) {
        $vars["has_dropdown"]  = "";
        $vars["menu_dropdown"] = "";
        $vars["username"] = "Login"; # "<a href='/app.php?app=login'>Login</a>";

        return $vars;
    }
}

?>