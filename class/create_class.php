<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $create_class_err = [];
        $data = json_decode(file_get_contents("php://input"));
        $class = $data->newClass;
        if(strlen($class) <= 0){
            array_push($create_class_err, "Please, enter valid class");
        }
        if(strlen($class) > 5){
            array_push($create_class_err, "Too long class name");
        }
        if(count($create_class_err) > 0){
            echo json_encode(array('err' => $create_class_err));
        } else{
            require_once("../config.php");

            $class_create_statement = $pdo->prepare("INSERT INTO class(class_name) VALUES(:class_name)");
            $class_create_statement->bindValue(":class_name", $class);
            $class_create_statement->execute();

            $select_class_statement = $pdo->prepare("SELECT * FROM class");
            $select_class_statement->execute();
            $classes = $select_class_statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array("msg" => "ok", "data" => $classes));
        }
    }
