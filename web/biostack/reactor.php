<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    /**
     * Create a task that run the dynamics model
     * 
     * @method POST
    */
    public function run($id) {    
        $app = TaskMgr::getApp("Systems_Dynamics");
        $app_id = $app["id"];    
        $args = [
            "resolution" => 10000
        ];
        $id = TaskMgr::addTask($app_id, "Run Systems Dynamics", $args);

        if (Utils::isDbNull($id)) {
            controller::error("database error!",1, TaskMgr::getTaskMgr()->task->getLastMySql());
        } else {
            controller::success($id);
        }
    }
}