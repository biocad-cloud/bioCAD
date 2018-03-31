<?php

# Module file for handling HTML user interface
include "./mod/dotnet/package.php";

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app(), "./html/Application/");
// dotnet::printMySqlTransaction();
dotnet::writeMySqlLogs(TRUE);

class app {

    public function project() {

    }

    public function task() {
        
    }

    /**
	 * 用户设置中心
	 * 
	 */
	public function me() {
		view::Display(array("title" => "My Settings"));
	}
}

?>