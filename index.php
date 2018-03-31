<?php

# home page

include "./mod/dotnet/package.php";

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app());

class app {

	/**
	 * 在这里的所有的页面都不需要进行身份验证 
	 * 
	 */

	public function index() {
		view::Display(array("title" => "bioCAD cloud platform"));
	}

	public function apps() {
		view::Display(array("title" => "bioCAD Applications"));
	}

	public function downloads() {
		view::Display(array("title" => "Download GCModeller"));
	}

	public function about() {
		view::Display(array("title" => "About bioCAD"));
	}

	public function search() {
		$term = $_GET["q"];
		$result = "";

		if (!$term) {
			$result = "No term provided!";
		} else {
			$result = $this->searchInternal($term);
		}

		$_GET["result"] = $result;
		$_GET["title"] = "Search Result";

		view::Display($_GET);
	}

	private function searchInternal($term) {
		return "search";
	}
}

?>