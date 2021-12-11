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
     * @uses jsonrpc
     * @access *
     * @accept 127.0.0.1|localhost|8.210.29.117
    */
    public function index($rpc) {
        imports("php.taskhost.jsonRPC");
        # call methods
        # handle json rpc
        jsonRPC::handleRPC($this, $rpc);
    }

    public function setTaskStatus($guid, $status) {

    }

    public function setTaskProgress($guid, $progress) {
        
    }
}