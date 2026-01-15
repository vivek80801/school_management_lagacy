<?php
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");
        
        $section_statement = $pdo->prepare("SELECT * FROM section");
        $section_statement->execute();
        $sections = $section_statement->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode(array("msg" => "ok", "data" => $sections));
    }else if($_SERVER["REQUEST_METHOD"] === "PUT"){
        $data = json_decode(file_get_contents("php://input"));
        $section_name = $data->sectionName;
        $section_id = $data->sectionId;

        require_once("../config.php");

        $section_edit_statement = $pdo->prepare("UPDATE section SET section=:section WHERE id=:id");
        $section_edit_statement->bindValue(":section", $section_name);
        $section_edit_statement->bindValue(":id", $section_id);
        $section_edit_statement->execute();

        $section_select_statement = $pdo->prepare("SELECT * FROM section");
        $section_select_statement->execute();
        $sections = $section_select_statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("msg" => "ok", "data" => $sections));
    }else if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        require_once("../config.php");
        $delete_section_statement = $pdo->prepare("DELETE FROM section WHERE id=:id");
        $delete_section_statement->bindValue(":id", (int) $id);
        $delete_section_statement->execute();

        $section_statement = $pdo->prepare("SELECT * FROM section");
        $section_statement->execute();
        $sections = $section_statement->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode(array("msg" => "ok", "data" => $sections));
    }
