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

    public static function addTask($app_id, $title, $args, $project_id = -1) {
        imports("php.BEncode.autoload");

        $sha  = md5(Utils::Now() . $title . System::getUserId());
        $args = Rych\Bencode::encode($args);

        return self::getTaskMgr()->task->add([
            "sha1" => $sha,
            "user_id" => System::getUserId(),
            "project_id" => $project_id,
            "app_id" => $app_id,
            "title" => $title,
            "create_time" => Utils::Now(),
            "status" => 0,
            "note" => "",
            "parameters" => $args
        ]);
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