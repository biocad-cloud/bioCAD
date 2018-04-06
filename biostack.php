<?php

# Module file for handling biostack data analysis API
include "./mod/dotnet/package.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("php.Utils");

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new biostack());
// dotnet::printMySqlTransaction();
// dotnet::writeMySqlLogs(TRUE);

class biostack {

    public function index() {

    }

    public function log2FC() {

    }

    public function volcano() {
        
    }

}

?>