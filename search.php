<?php

    include "./mod/dotnet/package.php";

    dotnet::AutoLoad("./etc/config.php");

    $term = $_GET["q"];
    $result = "";

    if (!$term) {
        $result = "No term provided!";
    } else {
        $result = search($term);
    }

    $_GET["result"] = $result;
    $_GET["title"] = "Search Result";

    view::Show("html/search.html", $_GET);

    function search($term) {
        return "search";
    }

?>