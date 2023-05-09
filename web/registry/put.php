<?php

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * put data to registry
*/
class app {

    /**
     * put new taxonomic group data into registry
     * 
     * @method POST
     * @access *
    */
    public function taxonomic($name, $note = "") {
        $tax = new Table(["cad_registry" => "taxonomic"]);
        # check data is exists or not
        $check = $tax->where(["name" => urldecode($name)])->find();

        if (Utils::isDbNull($check)) {
            // add new
            $id = $tax->add([
                "name" => urldecode($name),
                "note" => urldecode($note)
            ]);

            controller::success(["id" => $id], $tax->getLastMySql());
        } else {
            // data is already exists
            controller::error(["id" => $check["id"], "exist_data" => $check]);
        }
    }
}