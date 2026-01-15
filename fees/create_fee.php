<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $create_fee_err = [];
        $data = json_decode(file_get_contents("php://input"));
        $class = $data->classForStudent;
        $fee = $data->fee;
        if(strlen($fee) <= 0){
            array_push($create_fee_err, "Please, Enter a valied fee");
        }

        if(strlen($class) <= 0){
            array_push($create_fee_err, "Please, Choose a valid class");
        }
        if(count($create_fee_err) > 0){
            echo json_encode(array("err" => $create_fee_err));
        }else {
            require_once("../config.php");
            $create_fee_statment = $pdo->prepare("INSERT INTO fee_structure( class, fee) VALUES (:class, :fee)");
            $create_fee_statment->bindValue(":class", $class);
            $create_fee_statment->bindValue(":fee", $fee);
            $create_fee_statment->execute();

            $select_fee_statement = $pdo->prepare("SELECT * FROM fee_structure");
            $select_fee_statement->execute();
            $fees = $select_fee_statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array('msg' =>  "ok", "data" => $data));
        }
    }else if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");
        $select_fee_statement = $pdo->prepare("SELECT f.id, f.class, f.fee, c.id, c.class_name as class_name FROM fee_structure f
            INNER JOIN class c ON  c.id=f.class
            ");
        $select_fee_statement->execute();
        $fee_structure = $select_fee_statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("msg" => "ok", "data" => $fee_structure));
    }
