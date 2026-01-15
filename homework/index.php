<?php
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $id = (int)explode("=", $_SERVER["QUERY_STRING"])[1];
    require_once("../config.php");
    $select_homework_statement = $pdo->prepare("SELECT * FROM homework WHERE created_by=:created_by");
    $select_homework_statement->bindValue(":created_by", $id);
    $select_homework_statement->execute();
    $homeworks = $select_homework_statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array("msg" => "ok", "data" => $homeworks));
}else if($_SERVER["REQUEST_METHOD"] === "POST"){
    $data = json_decode(file_get_contents("php://input"));
    $title = $data->title;
    $homework = $data->homework;
    $created_by = $data->created_by;
    $classs = $data->classs;
    $section = $data->section;
    $subject = $data->subject;
    require_once("../config.php");

    $create_homework_statement = $pdo->prepare("INSERT INTO homework(title, class, section, subject, homework, created_by) VALUES (:title, :class, :section, :subject, :homework, :created_by)");
    $create_homework_statement->bindValue(":title", $title);
    $create_homework_statement->bindValue(":class", $classs->id);
    $create_homework_statement->bindValue(":section", $section->id);
    $create_homework_statement->bindValue(":subject", $subject->id);
    $create_homework_statement->bindValue(":homework", $homework);
    $create_homework_statement->bindValue(":created_by", (int) $created_by);
    $create_homework_statement->execute();

    $homework_id = $pdo->lastInsertId();

    $select_homework_statement = $pdo->prepare("SELECT * FROM homework WHERE id=:id");
    $select_homework_statement->bindValue(":id", (int) $homework_id);
    $select_homework_statement->execute();
    $new_homework = $select_homework_statement->fetch(PDO::FETCH_ASSOC);

    echo json_encode(array("msg" => "ok", "data" => $new_homework));
}
