<?php

namespace biocad;

class Rscript {

    public function exec($argv) {     
        return \RWeb::exec("KeggMap", ["id" => $argv["id"]]);
    }
}