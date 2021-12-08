<?php

define("KEGG_REPOSITORY", "/opt/repository");

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    /**
     * KEGG pathway designer
     * 
     * @uses view
    */
    public function index($guid = NULL) {
        View::Display([
            "graph" => "/resources/vendor/Cola/SucroseBreakdownDicots.json"
        ]);
    }

    /**
     * Flow network editor
     * 
     * Flow network editor for systems dynamics analysis
     * 
     * @uses view
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
     * save the model json into a unify system's data repository.
     * 
     * @param $guid the unique reference id for the model,
     *    default NULL means create new model in the platform.
     * @param $model the model json object, for save as 
     *    model file
     * 
     * @method POST
    */
    public function save($model, $guid = NULL) {
        $json  = json_encode($model);
        $usrId = System::getUserId();
        $dir   = bioCAD::getUserDir();
        $name  = "flow_" . Utils::Now() . ".json";
        $uniqName = Utils::UnixTimeStamp();
        $filepath = str_replace("//", "/", "{$dir}/{$uniqName}");

        FileSystem::WriteAllText($filepath, $json);

        if (!file_exists($filepath)) {
            controller::error("File System Error!",1, $filepath);
        }

        if ($usrId <> -1) {
            // save to database
            if (!Utils::isDbNull($guid)) {
                // update
            } else {
                // add new
                $guid = DataRepository::getRepo()->addFile($name, $filepath);
            }    
            
            if (!Utils::isDbNull($guid)) {
                controller::success($guid);
            } else {
                controller::error("database error...", 1, DataRepository::getLastMySql());
            }
        } else {
            controller::success(session_id());
        }
    }
}