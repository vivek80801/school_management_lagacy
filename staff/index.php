<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->name;
        $work = $data->work;
        require_once("../config.php");
        $create_staff_statement = $pdo->prepare("INSERT INTO staff(name, work) VALUES(:name, :work)");
        $create_staff_statement->bindValue(":name", $name);
        $create_staff_statement->bindValue(":work", $work);
        $create_staff_statement->execute();

        echo json_encode(array("msg" => "ok"));
    }else if($_SERVER["REQUEST_METHOD"] === "GET") {
        require_once("../config.php");

        $select_staff_statement = $pdo->prepare("SELECT * FROM staff");
        $select_staff_statement->execute();

        $staffs = $select_staff_statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("msg" => "ok", "data" => $staffs));
    }else if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        require_once("../config.php");
        $delete_staff_statement = $pdo->prepare("DELETE FROM staff WHERE id=:id");
        $delete_staff_statement->bindValue(":id", (int) $id);
        $delete_staff_statement->execute();

        echo json_encode(array("msg" => "ok"));
    }
