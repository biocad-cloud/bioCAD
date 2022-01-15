<?php

namespace biocad;

class Rscript {

    public function exec($argv) {     
        return \RWeb::exec("KeggGraph", ["id" => $argv["id"]]);
    }
}