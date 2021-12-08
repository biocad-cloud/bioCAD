<?php

/**
 * user task manager
*/
class TaskMgr {

    public static $status = [
        "0"   => "pending",
        "1"   => "running",
        "200" => "success",
        "500" => "failure"
    ];

    /**
     * @var Table
    */
    public $task;
    /**
     * @var TaskMgr
    */
    private $mgr;

    function __construct() {
        $this->task = new Table("task");
    }

    /**
     * @return TaskMgr
    */
    public static function getTaskMgr() {
        if (Utils::isDbNull(self::$mgr)) {
            self::$mgr = new TaskMgr();
        }

        return self::$mgr;
    }   

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