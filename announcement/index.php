<?php
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");
        $select_announcement_statement = $pdo->prepare("SELECT * FROM announcement");
        $select_announcement_statement->execute();

        $announcements = $select_announcement_statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("msg" => "ok", "data" => $announcements));
    }else if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $title = $data->title;
        $description = $data->description;
        require_once("../config.php");

        $create_announcement_statement = $pdo->prepare("INSERT INTO announcement(title, description) VALUES(:title, :description)");
        $create_announcement_statement->bindValue(":title", $title);
        $create_announcement_statement->bindValue(":description", $description);
        $create_announcement_statement->execute();

        echo json_encode(array("msg" => "ok"));
    }else if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        require_once("../config.php");

        $delete_announcement_statement = $pdo->prepare("DELETE FROM announcement WHERE id=:id");
        $delete_announcement_statement->bindValue(":id", (int) $id);
        $delete_announcement_statement->execute();

        echo json_encode(array("msg" => "ok"));
    }
