<?php

include "../modules/dotnet/package.php";
include "../common.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("php.Utils");

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new biostack(), WEB_APP);

class biostack {

}
?>