<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    /**
     * KEGG pathway designer
     * 
     * @uses view
     * @access *
    */
    public function index($guid = NULL) {
        View::Display();
    }
}