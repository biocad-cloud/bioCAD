<?php

/**
 * A data directory that contains kegg database files.
*/
define("KEGG_REPOSITORY", "/opt/repository/");

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * data repository for system files and user models
*/
class app {

    /**
     * get my model files
     * 
     * @require page=i32|page_size=i32
     * 
     * @uses api
     * @method GET
    */
    public function fetchMy($page = 1, $page_size = 25) {
        $files = DataRepository::getMyModelFiles($page, $page_size);
        $query = DataRepository::getLastMySql();

        controller::success($files, $query);
    }
}