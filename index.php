<html>
    <header>
        <title>GCModeller Commands</title>
    </header>
    <body>

        <h1>Welcomes to the GCModeller Cloud platform</h1>
        <hr>
        <?php

    /*
        list all of the avaliable GCModeller commandline tools 
    */
    $output = shell_exec('gcmodeller --ls');
    echo "<pre>$output</pre>";
        ?>
    </body>
</html>