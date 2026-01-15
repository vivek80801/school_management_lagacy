<?php
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");
        
        $class_statement = $pdo->prepare("SELECT * FROM class");
        $class_statement->execute();
        $classes = $class_statement->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode(array("msg" => "ok", "data" => $classes));
    }else if($_SERVER["REQUEST_METHOD"] === "PUT") {
        require_once("../config.php");
        $data = json_decode(file_get_contents("php://input"));
        $class_name = $data->className;
        $id = $data->id;

        $class_statement = $pdo->prepare("UPDATE class SET class_name=:class_name WHERE id=:id");
        $class_statement->bindValue(":class_name", $class_name);
        $class_statement->bindValue(":id",(int) $id);
        $class_statement->execute();

        $select_class_statement = $pdo->prepare("SELECT * FROM class");
        $select_class_statement->execute();
        $classes = $select_class_statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("msg" => "ok", "data" => $classes));
    }else if($_SERVER["REQUEST_METHOD"] === "DELETE") {
        $data = json_decode(file_get_contents("php://input"));
        $id =  $data->id;
        require_once("../config.php");
        $delete_class_statement = $pdo->prepare("DELETE FROM class WHERE id=:id");
        $delete_class_statement->bindValue(":id", (int) $id);
        $delete_class_statement->execute();

        $select_class_statement = $pdo->prepare("SELECT * FROM class");
        $select_class_statement->execute();
        $classes = $select_class_statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("msg" => "ok", "data" => $classes));
    }
    
