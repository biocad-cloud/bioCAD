<?php

class taskMgr {

    public static $status = [
        "0"   => "pending",
        "1"   => "running",
        "200" => "success",
        "500" => "failure"
    ];

    public static function GetTaskWorkspace($task_id) {        
        $task = (new Table("task"))
            ->where(["id|sha1" => $task_id])
            ->find();
            
        $appID  = $task["app_id"];
        $userID = $task["user_id"];
        $taskID = $task["id"];

        return "/data/upload/$userID/$appID/$taskID/";
    }
}