<?php

include "../modules/dotnet/package.php";
include "../common.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("MVC.view");
Imports("php.Utils");

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");
define("APP_PATH", dirname(dirname(__FILE__)));

View::Push("dismiss_banner", Common::BannerDismissStatus());

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new biostack(), WEB_APP);

/**
 * 数据分析模块的用户界面
*/
class biostack {

    public function index() {

    }

    public function log2FC() {

    }

    public function volcano() {
        
    }

    public function iTraq() {
        $vars           = Common::getUserInfo();
		$vars["title"]  = "iTraq data";		
		
		View::Show(WEB_APP . "/proteomics/iTraq.html", $vars);
    }

    public function enrichment() {
        $type           = Utils::ReadValue($_GET, "type", "input");
        $vars           = Common::getUserInfo();
		$vars["title"]  = "GeneSet Enrichment Analysis";        
        $vars["iframe"] = Router::AssignController("{<biostack>web/enrichment_$type}"); 

		View::Show(WEB_APP . "/analysis/enrichment.html", $vars);
    }

    public function enrichment_input() {
        View::Show(WEB_APP . "/analysis/enrichment_input.html");
    }

    public function enrichment_result() {
        $task_id = Utils::ReadValue($_GET, "id");

        if (!$task_id) {
            dotnet::PageNotFound("No task ID provided!");
        }

        View::Show(WEB_APP . "/analysis/enrichment_result.html");
    }
}

?>