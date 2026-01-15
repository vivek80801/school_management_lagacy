<?php
        //@TODO: implement  validation 
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $subject = $data->subject;
        require_once("../config.php");
        $subject_statement = $pdo->prepare("INSERT INTO subject(subject_name) VALUES(:subject)");
        $subject_statement->bindValue(":subject", $subject);
        $subject_statement->execute();

        $select_subject_statement = $pdo->prepare("SELECT * FROM subject");
        $select_subject_statement->execute();
        $subjects = $select_subject_statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("msg" => "ok", "data" => $subjects));
    } else if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        require_once("../config.php");
        $subject_delete_statement = $pdo->prepare("DELETE FROM subject WHERE id=:id");
        $subject_delete_statement->bindValue(":id", $id);
        $subject_delete_statement->execute();

        $select_subject_statement = $pdo->prepare("SELECT * FROM subject");
        $select_subject_statement->execute();
        $subjects = $select_subject_statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("msg" => "ok", "data" => $subjects));
    }else if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");

        $select_subject_statement = $pdo->prepare("SELECT * FROM subject");
        $select_subject_statement->execute();
        $subjects = $select_subject_statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("msg" => "ok", "data" => $subjects));
    }else if($_SERVER["REQUEST_METHOD"] === "PUT"){
        $data = json_decode(file_get_contents("php://input"));
        require_once("../config.php");
        $subject_name = $data->subjectName;
        $id = $data->id;

        $edit_subject_statement = $pdo->prepare("UPDATE subject SET subject_name=:subject_name WHERE id=:id");
        $edit_subject_statement->bindValue(":subject_name", $subject_name);
        $edit_subject_statement->bindValue(":id", $id);
        $edit_subject_statement->execute();

        $select_subject_statement = $pdo->prepare("SELECT * FROM subject");
        $select_subject_statement->execute();
        $subjects = $select_subject_statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("msg" => "ok", "data" => $subjects));
    }
