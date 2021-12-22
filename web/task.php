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

        controller::success($data, $debug);
    }


    /**
     * Load data result table file
     * 
     * @param string $guid the task guid
     * 
     * @uses file
     * @require guid=string
    */
    public function loadPLAS($guid) {
        $dir  = TaskMgr::getTaskWorkDir($guid);
        $file = "$dir/PLAS.csv";

        if (file_exists($file)) {
            Utils::PushDownload($file);
        } else {
            dotnet::PageNotFound(RESULT_FILE_ACCESS_ERROR);
        }
    }
    
    /**
     * View report
     * 
     * @param $q the task guid
     * @uses view
     * @require q=string
    */
    public function report($q) {
        View::Display([

        ]);
    }
}