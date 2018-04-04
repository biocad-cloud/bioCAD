<?php

# Module file for handling HTML user interface
include "./mod/dotnet/package.php";
include "./html/view_common.php";

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app(), "./html/Application");
// dotnet::printMySqlTransaction();
dotnet::writeMySqlLogs(TRUE);

class app {

	/*
		Session之中所保存的临时信息的数据结构大致如下：

		{
			user: {
				uid, name, email, role
			}, 
			settings: {
				anonymous_warning, notify_config
			}
		}
	
	*/

	// Load user info from php session
	private function userInfo() {
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

	// 获取当前的用户的配置信息
	public function getMySettings() {
		$config = $_SESSION["settings"];
		$config = json_encode($config);

		echo $config;
	}

	// 登录页面
	public function login() {

	}

    public function project() {
		$vars = $this->userInfo();
		$vars["title"] = "My Projects";
		# 当前的页面的编号
		$page = $_COOKIE["project_page"];
		# 每一个分页的所显示的项目数量
		$pagen = 5;
		$start = $page * $pagen;

		// select limit a,b;
		$projects = (new Table("projects"))->select($start, $pagen);

		// 循环显示出来
		$template = View::Load("./html/Application/project_template.html");
		$projectlist = new StringBuilder();

		if ($projects) {
			foreach ($projects as $project) {
				$projectlist->AppendLine(View::InterpolateTemplate($template, $project));
			}
		} else {
			$projectlist->AppendLine("No project avaliable!");
		}

		setcookie("project_page", $pagen + 1, time() + 1000000);

		$vars["projects"] = $projectlist->ToString();

		view::Display($vars);
    }

    public function task() {
        
    }

    /**
	 * 用户设置中心
	 */
	public function me() {

		// 首先需要从session之中读取在服务器后台所保存的临时信息
		// 
		$vars          = $this->userInfo();
		$vars["title"] = "My Settings";

		view::Display($vars);
	}
}

?>