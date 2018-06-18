<?php

include "../modules/dotnet/package.php";
include "../common.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("php.Utils");

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");
define("APP_PATH", dirname(dirname(__FILE__)));

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new biostack(), WEB_APP);

class biostack {

    /**
     * 创建一个基因列表富集分析的后台任务
    */
    public function enrichment_task() {
        $orgID   = $_POST["org_id"];
        $orgName = $_POST["org_name"];
        $geneSet = $_POST["geneSet"];
        $user    = Common::getUserInfo();
        $userID  = 0;

        # echo var_dump($user);

        //
        $appID = 100;

        if (!$user || !array_key_exists("id", $user)) {
            $userID = -1;
        } else {
            $userID = $user["id"];
        }

        $args = [
            "organism"     => $orgID,
            "organismName" => $orgName
        ];
        $task = [
            "user_id"     => $userID,
            "sha1"        => Utils::Now() . $appID . $userID,
            "project_id"  => -1,
            "app_id"      => $appID,
            "title"       => "GeneSet enrichment analysis for: " . $orgName,
            "create_time" => Utils::Now(),
            "status"      => 0,
            "note"        => "",
            "parameters"  => json_encode($args)
        ];

        $taskID    = (new Table("task"))->add($task);
        $workspace = "/data/upload/$userID/$appID/$taskID/";

        # save geneset list as text file into workspace
        $taskIDHash = md5(strval($taskID));    
        (new Table("task"))->where(["id" => $taskID])->save(["sha1" => $taskIDHash]);  

        $geneSet = implode("\n", $geneSet);
        $txt     = APP_PATH . $workspace . "geneSet.txt";
        $url     = "{<biostack>web/enrichment}&type=result&id=$taskIDHash";

        FileSystem::WriteAllText($txt, $geneSet);

        echo dotnet::successMsg(Router::AssignController($url));
    }
}
?>