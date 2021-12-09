<?php

include __DIR__ . "/../framework/bootstrap.php";

/**
 * Data analysis task manager
*/
class app {

    /**
     * Fetch current task list
     * 
     * @uses api
    */
    public function fetch($page = 1, $page_size = 5) {
        controller::success(TaskMgr::getTaskList($page, $page_size), TaskMgr::getLastMySql());
    }
}