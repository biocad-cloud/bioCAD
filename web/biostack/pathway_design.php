<?php

define("KEGG_REPOSITORY", "/opt/repository");

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    /**
     * KEGG pathway designer
     * 
     * @uses view
     * @access *
    */
    public function index($guid = NULL) {
        View::Display([
            "graph" => "/resources/vendor/Cola/SucroseBreakdownDicots.json"
        ]);
    }

    /**
     * Flow network editor for systems dynamics analysis
     * 
     * @uses view
     * @access * 
    */
    public function flowEditor($guid = NULL) {
        View::Display();
    }

    /**
     * KEGG repository
     * 
     * @access *
     * @uses api
    */
    public function kegg_repo($file) {
        $file = KEGG_REPOSITORY . "/" . $file;

        if (!file_exists($file)) {
            controller::error("the requested file is not exists in kegg repository!");
        } else {
            $file = file_get_contents($file);
            $file = json_decode($file);

            controller::success($file);
        }
    }

    /**
     * Save model json as file
     * 
     * @param $guid the unique reference id for the model,
     *    default NULL means create new model in the platform.
     * 
     * @method POST
    */
    public function save($model, $guid = NULL) {
        breakpoint($model);
    }
}