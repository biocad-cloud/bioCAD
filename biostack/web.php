<?php

include "../modules/dotnet/package.php";
include "../common.php";
include "../platform/task.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("MVC.view");
Imports("php.Utils");

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");
define("APP_PATH", dirname(dirname(__FILE__)));

View::Push("dismiss_banner", Common::BannerDismissStatus());
View::Push("*", Common::getUserInfo());

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new biostack(), WEB_APP . "/analysis/");

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
        $task_ID        = Utils::ReadValue($_GET, "id", "");
        $vars           = Common::getUserInfo();
		$vars["title"]  = "GeneSet Enrichment Analysis";        
        $vars["iframe"] = Router::AssignController("{<biostack>web/enrichment_$type}&id=$task_ID"); 

        if ($type == "result" && Strings::Len($task_ID) === 0) {
            dotnet::PageNotFound("No <strong>&lt;task ID></strong> is provided!");
        }

		View::Display($vars);
    }

    public function enrichment_input() {
        View::Display();
    }

    public function enrichment_result() {
        $task_id = Utils::ReadValue($_GET, "id");
        $task    = null;

        if (!$task_id) {
            RFC7231Error::err404("No task ID provided!", false);
        } else {
            
            $task = (new Table("task"))
                ->where(["sha1" => $task_id])
                ->find();

            if (!$task) {
                $trace = StackTrace::GetCallStack();
		        $exc   = dotnetException::FormatOutput(
                    "No task could be found based on the <strong>taskID</strong> that you provided!", 
                    $trace
                );
                RFC7231Error::err500($exc, false);
            }
        }

        $organism = json_decode($task["parameters"]);
        $organism = $organism->organismName;
        $status   = taskMgr::$status[strval($task["status"])];
        $vars = [
            "title"       => $task["title"],
            "organism"    => $organism,
            "status_text" => $status,
            "taskID"      => $task_id
        ];

        if ($task["status"] == 200 || $task["status"] == 500) {
            View::Push("task_success", "true");
        } else {
            View::Push("task_success", "false");
        }

        View::Display($vars);
    }

    public function custom_enrichment_plot() {
        View::Display(["title" => "Customize enrichment plot"]);
    }
}

?>