<?php

include "../modules/dotnet/package.php";
include "../common.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("php.Utils");

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");

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
        $vars           = Common::getUserInfo();
		$vars["title"]  = "GeneSet Enrichment Analysis";		
		
		View::Show(WEB_APP . "/analysis/enrichment.html", $vars);
    }

    public function enrichment_input() {
        View::Show(WEB_APP . "/analysis/enrichment_input.html", null);
    }
}

?>