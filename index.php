<?php

# home page

include "./modules/dotnet/package.php";
include "./common.php";

Imports("MVC.view");

define("APP_PATH", dirname(dirname(__FILE__)));

View::Push("dismiss_banner", Common::BannerDismissStatus());
View::Push("*", Common::getUserInfo());

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app());

class app {

	/**
	 * 在这里的所有的页面都不需要进行身份验证 
	 * 
	 */

	public function index() {
		view::Display(["title" => "bioCAD cloud platform"]);
	}

	public function apps() {		
		$vars["title"]      = "bioCAD Applications";
		$vars["breadcrumb"] = [
			["link" => "{index/apps}", "icon" => "fa-project-diagram", "title" => "Applications"]
		];

		view::Display($vars);
	}

	public function biostack() {		
		view::Display(["title" => "Introduce Biostack"]);
	}

	public function about() {
		view::Display(["title" => "About bioCAD"]);
	}

	public function privacy_policy() {		
		view::Display(["title" => "Privacy Policy"]);
	}

	public function terms_of_use() {
		view::Display(["title" => "Terms of Use for bioCAD"]);
	}

	public function login() {
		view::Display(["title" => "Login"]);
	}

	public function search() {
		$term = $_GET["q"];
		$result = "";

		if (!$term) {
			$result = "No term provided!";
		} else {
			$result = $this->searchInternal($term);
		}
			
		view::Display([
			"title"  => "Search Result", 
			"result" => $result
		]);
	}

	/*
	 * 根据所给定的词条返回在整个网站内的通用的搜索结果
	 */
	private function searchInternal($term) {
		$result_list = "";		
		
		return view::Load("./html/search_result.html", 
			[
				"list" => $result_list, 
				"term" => $term
			]);
	}

	public function change_log() {		
		view::Display(["title" => "bioCAD changelog"]);
	}
}

?>