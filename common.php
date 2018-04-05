<?php

class Common {

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

    // Load user info from php session
	public static function getUserInfo() {
		// 用户的标识信息是从服务器后台的session数据之中读取出来的
		// 如果客户是匿名的非注册客户，则当浏览器被清除掉cookie之后，
		// session关联信息将会丢失
		// 而注册用户则可以依靠数据库之中的唯一标识符来保持记录状态
		$user = $_SESSION["user"];

		if (!$user) {
			$user = self::AnonymousUserMenu(array());
		} else {
			$user = self::DisplayDropDownMenu($user);
		}

		return $user;
	}
}

?>