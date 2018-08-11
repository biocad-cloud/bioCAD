<?php

# home page

session_start();

define("APP_PATH", dirname(__FILE__));
define("APP_DEBUG", true);

include "./modules/dotnet/package.php";
include "./common.php";
include "./accessController.php";

Imports("MVC.view");
Imports("MVC.router");

View::Push("dismiss_banner", Common::BannerDismissStatus());
View::Push("*", Common::getUserInfo());

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app(), new accessController());

/**
 * 在这里的所有的页面都不需要进行身份验证	
*/
class app {
	
	/**
	 * bioCAD cloud platform
	 * 
	 * @access *
	 * @uses view
	*/
	public function index() {
		View::Display();
	}

	public function apps() {		
		$vars["title"]      = "bioCAD Applications";
		$vars["breadcrumb"] = [
			["link" => "{index/apps}", "icon" => "fa-project-diagram", "title" => "Applications"]
		];

		View::Display($vars);
	}

	/**
	 * Introduce Biostack
	 * 
	 * @access *
	 * @uses view
	*/
	public function biostack() {		
		View::Display();
	}

	/**
	 * About bioCAD
	 * 
	 * @access *
	 * @uses view
	*/
	public function about() {
		View::Display();
	}

	/**
	 * Privacy Policy
	 * 
	 * @access *
	 * @uses view
	*/
	public function privacy_policy() {		
		View::Display();
	}

	/**
	 * Terms of Use for bioCAD
	 * 
	 * @access *
	 * @uses view
	*/
	public function terms_of_use() {
		View::Display();
	}

	public function search() {
		$term = $_GET["q"];
		$result = "";

		if (!$term) {
			$result = "No term provided!";
		} else {
			$result = $this->searchInternal($term);
		}
			
		View::Display([
			"title"  => "Search Result", 
			"result" => $result
		]);
	}

	/*
	 * 根据所给定的词条返回在整个网站内的通用的搜索结果
	 */
	private function searchInternal($term) {
		$result_list = "";		
		
		return View::Load("./html/search_result.html", 
			[
				"list" => $result_list, 
				"term" => $term
			]);
	}

	/**
	 * bioCAD changelog
	 * 
	 * @access *
	 * @uses view
	*/
	public function change_log() {		
		View::Display();
	}
}

?>