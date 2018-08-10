<?php

Imports("System.Text.StringBuilder");

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

	/**
	 * 
	 * @param table: 最多只能够展示5列数据
	 * 
	*/
	public static function Table($table, $columns = NULL) {
		$template = View::Load("./html/includes/table.html");
		$html     = new StringBuilder();
		$theads   = NULL;
		$tnames   = NULL;

		if (!$columns) {
			$theads = array_keys($table[0]);
			$tnames = $theads;
		} else {
			$theads = array_keys($columns);
			$tnames = array();
			
			foreach ($theads as $key) {
				array_push($tnames, $columns[$key]);
			}
		}

		# <th class="cell100 column1">column name</th>
		for ($i = 0; $i < count($tnames); $i++) {
			$name  = $tnames[$i];
			$index = $i + 1;
			$html->AppendLine("<th class='cell100 column$index'>$name</th>");
		}
		
		$vars = array(
			"theads" => $html->ToString()
		);
		$html->Clear();

		foreach ($table as $tr) {
			$html->AppendLine('<tr class="row100 body">');

			for ($i = 0; $i < count($theads); $i++) {
				$value = $tr[$theads[$i]];
				$index = $i + 1;

				$html->AppendLine("<td class='cell100 column$index'>$value</td>");
			}			
			
			$html->AppendLine("</tr>");
		}

		$vars["rows"] = $html->ToString();

		return View::InterpolateTemplate($template, $vars);
	}
}

?>
