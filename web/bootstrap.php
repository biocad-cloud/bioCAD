<?php

define("APP_PATH", dirname(__FILE__));
define("APP_DEBUG", true);

session_start();

include APP_PATH . "/modules/dotnet/package.php";
include APP_PATH . "/accessController.php";

Imports("System.Linq.Enumerable");
Imports("System.Text.StringBuilder");
Imports("Microsoft.VisualBasic.Conversion");
Imports("Microsoft.VisualBasic.Strings");

Imports("MVC.view");
Imports("MVC.router");

View::Push("dismiss_banner", Common::BannerDismissStatus());
View::Push("*", Common::getUserInfo());

dotnet::AutoLoad(APP_PATH . "/etc/config.php");
dotnet::HandleRequest(new app(), new accessController());

class Common {

    public static function DisplayDropDownMenu($vars) {

		$vars["username"]      = $vars["account"];
        $vars["has_dropdown"]  = "has-dropdown";
        $vars["menu_dropdown"] = View::Load(APP_PATH . "/html/includes/menu_dropdown.html");

        return $vars;
    }

    public static function AnonymousUserMenu($vars) {
        $vars["has_dropdown"]  = "";
        $vars["menu_dropdown"] = "";
        $vars["username"] = "Login"; # "<a href='/app.php?app=login'>Login</a>";

        return $vars;
    }

    /**
	 * Load user info from php session
	*/ 
	public static function getUserInfo() {
		// 用户的标识信息是从服务器后台的session数据之中读取出来的
		// 如果客户是匿名的非注册客户，则当浏览器被清除掉cookie之后，
		// session关联信息将会丢失
		// 而注册用户则可以依靠数据库之中的唯一标识符来保持记录状态
		$user = isset($_SESSION["user"]) ? $_SESSION["user"] : null;

		if (!$user) {
			$user = self::AnonymousUserMenu(array());
		} else {
			$user = self::DisplayDropDownMenu($user);
		}	
				
		return $user;
	}

	public static function getUserId() {
		if (!isset($_SESSION)) {
			return -1;
		}		
		if (!array_key_exists("user", $_SESSION)) {
			return -1;
		} else {
			return Utils::ReadValue($_SESSION["user"], "id", -1);
		}
	}

	public static function BannerDismissStatus() {
		$hasOption = array_key_exists("dismiss_banner", $_SESSION);

		console::log("<strong>dismiss_banner</strong> option exists? " . strval($hasOption));

		# 因为在进行字符串替换的时候，false会被直接替换为空白字符串
		# 可能会导致脚本语法错误，所以逻辑值都需要转换为文本之后才可以
		if ($hasOption) {
			return $_SESSION["dismiss_banner"] ? "true" : "false";
		} else {			
			$_SESSION["dismiss_banner"] = false;
		}

		return "false";
	}
}

?>
