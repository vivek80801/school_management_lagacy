<?php

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $student_register_err = [];
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $father_name = $data->fatherName;
    $father_work = $data->fatherWork;
    $mother_name = $data->motherName;
    $mother_work = $data->motherWork;
    $student_class = $data->classForStudent;
    $section = $data->section;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $addmition_date = $data->addmitionDate;
    if(strlen($name) < 0){
        array_push($student_register_err, "Please, enter a valid name");
    }
    if(strlen($name) < 5){
        array_push($student_register_err, "Name can not be less then of 5 characters");
    }
    if(strlen($name) > 30){
        array_push($student_register_err, "Name can not be more then of 30 characters");
    }

    if(strlen($father_name) < 0){
        array_push($student_register_err, "Please, enter a valid father name");
    }
    if(strlen($father_name) < 5){
        array_push($student_register_err, "Father name can not be less then of 5 characters");
    }
    if(strlen($father_name) > 30){
        array_push($student_register_err, "Father name can not be more then of 30 characters");
    }

    if(strlen($father_work) < 0){
        array_push($student_register_err, "Please, enter a valid father work");
    }
    if(strlen($father_work) < 5){
        array_push($student_register_err, "Father work can not be less then of 5 characters");
    }
    if(strlen($father_work) > 30){
        array_push($student_register_err, "Father work can not be more then of 30 characters");

    }
    if(strlen($mother_name) < 0){
        array_push($student_register_err, "Please, enter a valid mother name");
    }
    if(strlen($mother_name) < 5){
        array_push($student_register_err, "Mother name can not be less then of 5 characters");
    }
    if(strlen($mother_name) > 30){
        array_push($student_register_err, "Mother name can not be more then of 30 characters");
    }

    if(strlen($mother_work) < 0){
        array_push($student_register_err, "Please, enter a valid mother work");
    }
    if(strlen($mother_work) < 5){
        array_push($student_register_err, "Mother work can not be less then of 5 characters");
    }
    if(strlen($mother_work) > 30){
        array_push($student_register_err, "Mother work can not be more then of 30 characters");
    }
    if(strlen($student_class) < 0){
        array_push($student_register_err, "Please, Enter a valid class");
    }
    if(strlen($student_class) > 2){
        array_push($student_register_err, "student class can not be more then 2 characters");
    }
    if(gettype((int) $student_class) !== "integer"){
        array_push($student_register_err, "student class can not only be numbers");
    }
    if(strlen($section) < 0){
        array_push($student_register_err, "Please, Enter a valid section");
    }
    if(count($student_register_err) <= 0){
        require_once("../config.php");
        $select_student_statement = $pdo->prepare("SELECT * FROM student");
        $select_student_statement->execute();
        $students = $select_student_statement->fetchAll(PDO::FETCH_ASSOC);

        $student_statement = $pdo->prepare("INSERT INTO student(name, father_name, father_work, mother_name, mother_work, roll_no, class, section, password, created_at) VALUES (:name, :father_name, :father_work, :mother_name, :mother_work, :roll_no, :class, :section, :password, :created_at)");
        $student_statement->bindValue(":name", $name);
        $student_statement->bindValue(":father_name", $father_name);
        $student_statement->bindValue(":father_work", $father_work);
        $student_statement->bindValue(":mother_name", $mother_name);
        $student_statement->bindValue(":mother_work", $mother_work);
        $student_statement->bindValue(":password", $password);
        $student_statement->bindValue(":roll_no", count($students) > 0 ? (int) $students[count($students) - 1]["roll_no"]  + 1 : 1);
        $student_statement->bindValue(":class", (int) ($student_class === "" ? 1: $student_class));
        $student_statement->bindValue(":section",(int) ($section === "" ? 1: $section));
        $student_statement->bindValue(":created_at", $addmition_date);

        $student_statement->execute();
        $student_Id = $pdo->lastInsertId();
        $fee_statement = $pdo->prepare("INSERT INTO fee_recevied(fee, student_id) VALUES (:fee, :student_id)");
        $fee_statement->bindValue(":fee", 0);
        $fee_statement->bindValue(":student_id", (int)$student_Id);
        $fee_statement->execute();

        echo json_encode(array("msg" => "ok"));
    }else{
        echo json_encode(array("err" => $student_register_err));
    }
}
