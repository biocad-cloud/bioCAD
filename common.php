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

			for ($i = 0; $ < count($theads); $i++) {
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