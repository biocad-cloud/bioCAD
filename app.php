<?php

# Module file for handling HTML user interface
include "./mod/dotnet/package.php";

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app());
// dotnet::printMySqlTransaction();
dotnet::writeMySqlLogs(TRUE);

class app {

}

?>