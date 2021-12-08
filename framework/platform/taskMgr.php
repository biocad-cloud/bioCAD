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
     * @var Table
    */
    public $app;

    /**
     * @var TaskMgr
    */
    private static $mgr;

    function __construct() {
        $this->task = new Table("task");
        $this->app = new Table("analysis_app");
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

    /**
     * @param args file id, project id all store in this data pack.
    */
    public static function addTask($app_id, $title, $args) {
        imports("php.BEncode.autoload");
        breakpoint($args);
        $sha  = md5(Utils::Now() . $title . System::getUserId());
        $args = Rych\Bencode::encode($args);

        return self::getTaskMgr()->task->add([
            "sha1" => $sha,
            "user_id" => System::getUserId(),            
            "app_id" => $app_id,
            "title" => $title,
            "create_time" => Utils::Now(),
            "status" => 0,
            "note" => "",
            "parameters" => $args
        ]);
    }

    public static function getApp($ref) {
        $mgr = self::getTaskMgr();
        $app = $mgr->app->where(["name" => $ref])->find();

        return $app;
    }

    /**
     * Get workspace of the task
    */
    public static function getTaskWorkDir($task_id) {        
        $task = self::getTaskMgr()
            ->task
            ->where(["id|sha1" => $task_id])
            ->find();
            
        $appID  = $task["app_id"];
        $userID = System::getUserId();
        $taskID = $task["sha1"];

        return "/tmp/biocad_workspace/$userID/$appID/$taskID/";
    }
}