<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    public function index($run = NULL) {
        if (!Utils::isDbNull($run)) {
            $this->runModel($run);
        }
    }

    /**
     * Create a task that run the dynamics model
    */
    private function runModel($id) {

    }
}