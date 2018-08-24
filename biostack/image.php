<?php

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");
define("APP_PATH", dirname(dirname(__FILE__)));

include "../bootstrap.php";

class biostack {

    public function enrichment() {
        $task_id   = $_GET["id"];
        $workspace = taskMgr::GetTaskWorkspace($task_id);
        $fileName  = ($_GET["type"] == "kegg") ? "KEGG" : "GO_terms";
        $png       = APP_PATH . "/$workspace/$fileName.png";

        Utils::PushDownload($png, -1, "image/png");
    }
}
?>
