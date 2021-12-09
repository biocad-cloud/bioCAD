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
        $data  = TaskMgr::getTaskList($page, $page_size);
        $debug = TaskMgr::getLastMySql();
breakpoint($debug);
        controller::success($data, $debug);
    }
}