<?php

# Module file for handling HTML user interface
include "./mod/dotnet/package.php";
include "./common.php";

Imports("Microsoft.VisualBasic.Conversion");

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app(), "./html/Application");
// dotnet::printMySqlTransaction();
dotnet::writeMySqlLogs(TRUE);

class app {

	public function index() {
		Redirect("{index/apps}&test=false");
	}

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
		$vars = Common::getUserInfo();
		$vars["title"] = "My Projects";
		# 当前的页面的编号
		$action = $_GET["action"];
		$page = $_COOKIE["project_page"];
		# 每一个分页的所显示的项目数量
		$pagen = 3;
		$start = 0;		

		if ($action) {

			if (!$page) {
				$page = 0;
			}

			if (Strings::LCase($action) == "next") {
				$page++;				
			} elseif (Strings::LCase($action) == "previous") {
				$page--;
			}

		} elseif (array_key_exists("page", $_GET)) {
			$page = Conversion::CInt($_GET["page"]);
		} else {
			# display current page
			# page = page
			if (!$page) {
				$page = 0;
			}
		}

		$start = $page * $pagen;
		# echo "$start = $page * $pagen";

		// select limit a,b;
		$projects = (new Table("project"))->select($start, $pagen);

		// 循环显示出来
		$template = View::Load("./html/Application/project_template.html");
		$projectlist = new StringBuilder();

		if ($projects) {
			foreach ($projects as $project) {
				$name = $project["name"];
				$projID = $project["id"];
				$project["name"] = "<a href='/app.php?app=explorer&project_id=$projID'>$name</a>";
				$projectlist->AppendLine(View::InterpolateTemplate($template, $project));
			}
		} else {
			$projectlist->AppendLine("No project avaliable!");
		}

		setcookie("project_page", $page, time() + 1000000);

		$vars["projects"] = $projectlist->ToString();

		view::Display($vars);
    }

	public function explorer() {
		$vars = Common::getUserInfo();
		$vars["title"]      = "File Explorer";
		$vars["project_id"] = $_GET["project_id"];
		
		view::Display($vars);
	}

	public function upload() {
		view::Display($_GET);
	}

	# 一些需要执行比较久的数据分析任务的列表
	# 功能富集
	# 功能注释
    public function task() {
        
    }

    /**
	 * 用户设置中心
	 */
	public function me() {

		// 首先需要从session之中读取在服务器后台所保存的临时信息
		// 
		$vars          = Common::getUserInfo();
		$vars["title"] = "My Settings";

		view::Display($vars);
	}
}

?>