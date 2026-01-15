<?php
    $host = "localhost";
    $port = "3306";
    $db_name = "school_management_software";
    $db_user = "root";
    $db_password = "";
    $pdo = new PDO("mysql:host=${host};port=${port};dbname=${db_name}", $db_user, $db_password);

    session_start();
?>
