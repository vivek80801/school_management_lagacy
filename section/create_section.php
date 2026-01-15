<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $create_section_err = [];
        $data = json_decode(file_get_contents("php://input"));
        $section = $data->section;
        if(strlen($section) <= 0 ){
            array_push($create_section_err, "Please, Enter a valid section");
        }
        if(strlen($section) > 5) {
            array_push($create_section_err, "Too long section");
        }
        if(count($create_section_err) > 0){
            echo json_encode(array('err' => $create_section_err));
        }else{
            require_once("../config.php");
            $create_section_statement = $pdo->prepare("INSERT INTO section (section) VALUES(:section)");
            $create_section_statement->bindValue(":section", $section);
            $create_section_statement->execute();

            $select_section_statement = $pdo->prepare("SELECT * FROM section");
            $select_section_statement->execute();
            $data = $select_section_statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array('msg' => "ok", "data" => $data ));
        }
    }
