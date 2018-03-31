<?php

# home page

include "./mod/dotnet/package.php";

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app());

class app {

	public function index() {
		view::Display(array("title" => "bioCAD cloud platform"));
	}
}

?>