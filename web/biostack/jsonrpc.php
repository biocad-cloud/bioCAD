<?php

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * Locally remote procedure call, for the data
 * communication between biocad docker contains
 * and different scriping language.
*/
class app {

    /**
     * @var Table
    */
    private $task;

    function __construct() {
        $this->task = new Table("task");
    }

    /**
     * jsonrpc exec
     * 
     * only allows RPC call locally.
     * 
     * @methodX POST
     * @uses jsonrpc
     * @access *
     * @acceptX 127.0.0.1|localhost|8.210.29.117
    */
    public function index($rpc = NULL, $method = NULL) {
        imports("php.taskhost.jsonRPC");

        if (!Utils::isDbNull($rpc)) {
            # call methods
            # handle json rpc
            jsonRPC::handleRPC($this, $rpc);
        } else {
            # run debug test
            jsonRPC::handleRPC($this, [
                "jsonrpc" => "2.0",
                "method" => $method,  
                "id" => 0
            ]);
        }
    }

    public function getModelFile($id) {
        $result = DataRepository::getModelData($id);

        if (Utils::isDbNull($result)) {
            jsonRPC::error([
                "debug" => $this->task->getLastMySql()
            ]);
        } else {
            jsonRPC::success($result, $rpc["id"]);
        }
    }

    public function setTaskStatus($guid, $status, $rpc) {
        $result = $this->task
          ->where([
            "id|sha1" => $guid
        ])->limit(1)
          ->save(["status" => $status]);
          
        if ($result) {
            jsonRPC::success(true, $rpc["id"]);
        } else {
            jsonRPC::error([
                "debug" => $this->task->getLastMySql()
            ]);
        }
    }

    public function setTaskProgress($guid, $progress, $rpc) {
        
    }
}