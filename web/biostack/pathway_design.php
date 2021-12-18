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
     * Model Viewer
     * 
     * @uses view
    */
    public function view($guid = NULL) {
        View::Display([
            "model_id" => $guid
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
        View::Display([
            "model_id" => $guid
        ]);
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
     * Load model json file
     * 
     * @param $model_id the model id in the database, default value NULL of 
     *    this parameter means returns the demo model json file.
     * 
    */
    public function load($model_id = NULL) {
        if (Utils::isDbNull($model_id) || Strings::Empty($model_id, TRUE)) {
            $path = APP_PATH . "/web/resources/vendor/Gojs/demo.json";
        } else {
            $path = DataRepository::getModelFile($model_id);

            if (Utils::isDbNull($path)) {
                dotnet::PageNotFound(MODEL_FILE_ACCESS_ERROR);            
            }
        }

        if (file_exists($path)) {
            Utils::PushDownload($path);
        } else {
            dotnet::PageNotFound("Missing model file '{$path}' on server filesystem...");
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
        
        if ($usrId <> -1) {
            $result = DataRepository::getRepo()->saveUserModel($json, $guid);
            $guid = $result["guid"];
            $filepath = $result["filepath"];
            $write = $result["write"];

            if (!file_exists($filepath)) {
                controller::error("File System Error!",1, $filepath);
            } else if (Utils::isDbNull($write)) {
                controller::error("database error...", 1, DataRepository::getLastMySql());
            } else {
                controller::success($guid);
            }
        } else {
            // temp path
            $filepath = bioCAD::getUserDir() . "/" . session_id() . ".json";
            // add new file if the guid is nothing
            FileSystem::WriteAllText($filepath, $json);

            if (!file_exists($filepath)) {
                controller::error("File System Error!",1, $filepath);
            } else {
                controller::success(session_id());
            }
        }
    }
}