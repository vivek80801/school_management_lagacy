<?php
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");

        $student_statement = $pdo->prepare("SELECT
            s.id, s.name, s.roll_no, s.father_name, s.father_work, s.mother_name, s.mother_work,
            s.class, s.section, c.id as class_id, c.class_name, se.id as section_id, se.section as section_name FROM student  s
            INNER JOIN class c on  s.class = c.id
            INNER JOIN section se on  s.class = se.id
        ");
        $student_statement->execute();

        $students = $student_statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("msg" => "ok", "data" => $students));

    }else if($_SERVER["REQUEST_METHOD"] === "PUT"){
        $student_register_err = [];
        $data = json_decode(file_get_contents("php://input"));

        $id = $data->id;
        $name = $data->name;
        $father_name = $data->fatherName;
        $father_work = $data->fatherWork;
        $mother_name = $data->motherName;
        $mother_work = $data->motherWork;
        $student_class = $data->class;
        $section = $data->section;
        $roll_no = $data->rollNo;

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
            $student_statement = $pdo->prepare("UPDATE student SET name=:name, father_name=:father_name, father_work=:father_work, mother_name=:mother_name, mother_work=:mother_work, roll_no=:roll_no, class=:class, section=:section WHERE id=:id");

            $student_statement->bindValue(":id", $id);
            $student_statement->bindValue(":name", $name);
            $student_statement->bindValue(":father_name", $father_name);
            $student_statement->bindValue(":father_work", $father_work);
            $student_statement->bindValue(":mother_name", $mother_name);
            $student_statement->bindValue(":mother_work", $mother_work);
            $student_statement->bindValue(":roll_no", $roll_no);
            $student_statement->bindValue(":class", $student_class);
            $student_statement->bindValue(":section", $section);

            $student_statement->execute();

            echo json_encode(array("msg" => "ok"));
        }else{
            echo json_encode(array("err" => $student_register_err));
        }
     }else if($_SERVER["REQUEST_METHOD"] === "DELETE") {
         $data = json_decode(file_get_contents("php://input"));
         $id = $data->id;
         require_once("../config.php");

         $student_delete_statement = $pdo->prepare("DELETE FROM student WHERE id=:id");
         $student_delete_statement->bindValue(":id", (int) $id);
         $student_delete_statement->execute();

         $student_statement = $pdo->prepare("SELECT * FROM student");
         $student_statement->execute();
         $students = $student_statement->fetchAll(PDO::FETCH_ASSOC);

         $fee_statement = $pdo->prepare("DELETE FROM fee_recevied WHERE student_id=:id");
         $fee_statement->bindValue(":id", (int) $id);
         $fee_statement->execute();

         echo json_encode(array('msg' =>"ok", "data" => $students));
     }
