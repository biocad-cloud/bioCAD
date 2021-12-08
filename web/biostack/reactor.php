<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    public function index($run = NULL) {
        if (!Utils::isDbNull($run)) {
            $this->runModel($run);
        }
    }

    /**
     * Create a task that run the dynamics model
    */
    private function runModel($id) {    
        $app_id = TaskMgr::getApp("Systems_Dynamics")["id"];    
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