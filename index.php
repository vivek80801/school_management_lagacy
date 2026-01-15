<?php
    $tmp_file_for_installation_check = "config.php";
    if(file_exists($tmp_file_for_installation_check)){ ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>School Management Software</title>
        </head>
        <body>
            <h4>Software is Installed</h4>
        </body>
        </html>
<?php
    }else {
        header("location: ./installer.php");
    }
?>
