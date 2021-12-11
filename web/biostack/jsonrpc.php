<?php

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * Locally remote procedure call, for the data
 * communication between biocad docker contains
 * and different scriping language.
*/
class app {

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

    }

    public function setTaskStatus() {

    }
}