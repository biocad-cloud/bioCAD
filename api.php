<?php

# Module file for handling biostack data analysis API
include "./mod/dotnet/package.php";

Imports("Microsoft.VisualBasic.Strings");

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new api());
// dotnet::printMySqlTransaction();
// dotnet::writeMySqlLogs(TRUE);

class api {

    public function upload() {
        
    }    
}

?>