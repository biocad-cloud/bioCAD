<?php

class userInfo {

    // Load user info from php session
	private function getUserInfo() {
		// 用户的标识信息是从服务器后台的session数据之中读取出来的
		// 如果客户是匿名的非注册客户，则当浏览器被清除掉cookie之后，
		// session关联信息将会丢失
		// 而注册用户则可以依靠数据库之中的唯一标识符来保持记录状态
		$user = $_SESSION["user"];

		if (!$user) {
			$user = ViewCommon::AnonymousUserMenu(array());
		} else {
			$user = ViewCommon::DisplayDropDownMenu($user);
		}

		return $user;
	}
}
?>