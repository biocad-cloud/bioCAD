<?php

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * pull data from registry
*/
class app {

    /**
     * get taxonomic group data
     * 
     * @param string $id the specific taxonomic group id, default null 
     *    means pull all taxonomic group entries.
     * 
     * @uses api
    */
    public function taxonomic_group($id = null) {
        $tax = new Table(["cad_registry" => "taxonomic"]);

        if (Utils::isDbNull($id)) {
            // pull all
            controller::success($tax->all());
        } else {
            $load = $tax->left_join("genomes")
            ->on(["genomes" => "taxonomic_group", "taxonomic" => "id"])
            ->where(["`taxonomic`.`id`" => $id])
            ->select([
                "`genomes`.*", "`taxonomic`.`name` as group"
            ])
            ;

            controller::success($load, $tax->getLastMySql());
        }
    }
}