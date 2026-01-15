<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $student = $data->name;
        require_once("../config.php");

        $select_student_statement = $pdo->prepare("SELECT
            s.id, s.name, s.roll_no, s.father_name, s.father_work, s.mother_name, s.mother_work,
        s.class, s.section, c.id as class_id, c.class_name, se.id as section_id, se.section as section_name FROM student  s
        INNER JOIN class c on  s.class = c.id
        INNER JOIN section se on  s.class = se.id
        WHERE name like :student
            ");
        $select_student_statement->bindValue(":student", "%". $student ."%");
        $select_student_statement->execute();
        $students = $select_student_statement->fetchAll(PDO::FETCH_ASSOC);
        if(count($students) > 0){
            echo json_encode(array("msg" => "ok", "data" => $students));
        }else{
            echo json_encode(array("msg" => "ok", "data" => []));
        }
    }
