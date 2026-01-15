<?php
//@TODO implement validation
//@TODO add section to teacher
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $name_of_teacher = $data->nameOfTeacher;
        $subjects = $data->subjects;
        $classes = $data->classes;
        require_once("../config.php");
        $teacher_password = password_hash($data->password, PASSWORD_DEFAULT);
        $teacher_statement = $pdo->prepare("INSERT INTO teacher(name, password) VALUES(:name, :password)");
        $teacher_statement->bindValue(":name", $name_of_teacher);
        $teacher_statement->bindValue(":password", $teacher_password);
        $teacher_statement->execute();

        $teacher_id = $pdo->lastInsertId();

        foreach ($subjects as $key => $sub) {
            $teacher_subject_statement = $pdo->prepare("INSERT INTO teacher_subject(subject_id, teacher_id) VALUES(:subject_id, :teacher_id)");
            $teacher_subject_statement->bindValue(":subject_id", (int) $sub->subject_name);
            $teacher_subject_statement->bindValue(":teacher_id", (int) $teacher_id);
            $teacher_subject_statement->execute();
        }

        foreach ($classes as $key => $classs) {
            $teacher_class_statement = $pdo->prepare("INSERT INTO techer_class(class_id, teacher_id) VALUES(:class_id, :teacher_id)");
            $teacher_class_statement->bindValue(":class_id", (int) $classs->class_name);
            $teacher_class_statement->bindValue(":teacher_id", (int) $teacher_id);
            $teacher_class_statement->execute();
        }

        echo json_encode(array("msg" => "ok"));
    }else if ($_SERVER["REQUEST_METHOD"] === "PUT"){
        require_once("../config.php");
        $data = json_decode(file_get_contents("php://input"));

        $classes = $data->classes;
        $subjects = $data->subjects;

        $teacher_class_get_statement = $pdo->prepare("SELECT * FROM techer_class WHERE teacher_id=:teacher_id");
        $teacher_class_get_statement->bindValue(":teacher_id", $data->id);
        $teacher_class_get_statement->execute();
        $teacher_old_classes = $teacher_class_get_statement->fetchAll(PDO::FETCH_ASSOC);

        $teacher_subject_get_statement = $pdo->prepare("SELECT * FROM teacher_subject WHERE teacher_id=:teacher_id");
        $teacher_subject_get_statement->bindValue(":teacher_id", $data->id);
        $teacher_subject_get_statement->execute();
        $teacher_old_subjects = $teacher_subject_get_statement->fetchAll(PDO::FETCH_ASSOC);

        foreach ($teacher_old_classes as $key => $old_class) {
            $is_matched = false;
            foreach ($classes as $key1 => $new_classes) {
                if($old_class['id'] === $new_classes->teacher_class_id){
                    $is_matched = true;
                    break;
                }
            }
            if($is_matched === false){
                $teacher_class_delete_statement = $pdo->prepare("DELETE FROM techer_class WHERE id=:teacher_class_id");
                $teacher_class_delete_statement->bindValue(":teacher_class_id", $old_class['id']);
                $teacher_class_delete_statement->execute();
            }
        }

        foreach ($teacher_old_subjects as $key => $old_subject) {
            $is_matched = false;
            foreach ($subjects as $key1 => $new_subject) {
                if($old_subject['id'] === $new_subject->teacher_subject_id){
                    $is_matched = true;
                    break;
                }
            }
            if($is_matched === false){
                $teacher_class_delete_statement = $pdo->prepare("DELETE FROM teacher_subject WHERE id=:teacher_class_id");
                $teacher_class_delete_statement->bindValue(":teacher_class_id", $old_subject['id']);
                $teacher_class_delete_statement->execute();
            }
        }

        foreach ($subjects as $key => $subject) {
            if($subject->teacher_subject_id === 0){
                $teacher_subject_insert_statement = $pdo->prepare("INSERT INTO teacher_subject(subject_id, teacher_id) VALUES(:subject_id, :teacher_id)");
                $teacher_subject_insert_statement->bindValue(":subject_id", $subject->subject_name);
                $teacher_subject_insert_statement->bindValue(":teacher_id", $data->id);
                $teacher_subject_insert_statement->execute();
            }else{
                $teacher_subject_edit_statement = $pdo->prepare("UPDATE teacher_subject SET subject_id=:subject_name WHERE id=:teacher_subject_id");
                $teacher_subject_edit_statement->bindValue(":subject_name", $subject->subject_name);
                $teacher_subject_edit_statement->bindValue(":teacher_subject_id", $subject->teacher_subject_id);
                $teacher_subject_edit_statement->execute();
            }
        }

        foreach ($classes as $key => $cls) {
            if($cls->teacher_class_id === 0){
                $teacher_class_insert_statement = $pdo->prepare("INSERT INTO techer_class(class_id, teacher_id) VALUES(:class_id, :teacher_id)");
                $teacher_class_insert_statement->bindValue(":class_id", $cls->class_name);
                $teacher_class_insert_statement->bindValue(":teacher_id", $data->id);
                $teacher_class_insert_statement->execute();
            }else{
                $teacher_class_edit_statement = $pdo->prepare("UPDATE techer_class SET class_id=:class_name WHERE id=:teacher_class_id");
                $teacher_class_edit_statement->bindValue(":class_name", $cls->class_name);
                $teacher_class_edit_statement->bindValue(":teacher_class_id", $cls->teacher_class_id);
                $teacher_class_edit_statement->execute();
            }
        }

        $teacher_edit_statement = $pdo->prepare("UPDATE teacher SET name=:name WHERE id=:id");
        $teacher_edit_statement->bindValue(":name", $data->teacherName);
        $teacher_edit_statement->bindValue(":id", $data->id);
        $teacher_edit_statement->execute();

        echo json_encode(array("msg" => "ok", "classes" => $classes, "old_classes" => $teacher_old_classes));

    }else if ($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");

        $teacher_select_statement = $pdo->prepare("SELECT * FROM teacher");
        $teacher_select_statement->execute();
        $teachers = $teacher_select_statement->fetchAll(PDO::FETCH_ASSOC);
        $newTeachers = [];

        foreach ($teachers as $key => $teacher) {
            $current_teacher = [];
            $teacher_select_subject_statement = $pdo->prepare("SELECT ts.id as teacher_subject_id, ts.subject_id, s.id as subject_id, s.subject_name FROM teacher_subject ts
                INNER JOIN subject s ON  ts.subject_id=s.id
                WHERE teacher_id=:teacher_id");
            $teacher_select_subject_statement->bindValue(":teacher_id", (int) $teacher["id"]);
            $teacher_select_subject_statement->execute();
            $teacher_subjects = $teacher_select_subject_statement->fetchAll(PDO::FETCH_ASSOC);

            $teacher_select_class_statement = $pdo->prepare("SELECT tc.id as teacher_class_id, tc.class_id as class_id, c.id, c.class_name FROM techer_class tc
                INNER JOIN class c ON  tc.class_id=c.id
                WHERE teacher_id=:teacher_id");
            $teacher_select_class_statement->bindValue(":teacher_id", (int) $teacher["id"]);
            $teacher_select_class_statement->execute();
            $teacher_classes = $teacher_select_class_statement->fetchAll(PDO::FETCH_ASSOC);

            $current_teacher["name"] = $teacher["name"];
            $current_teacher["id"] = $teacher["id"];
            $current_teacher["subjects"] = $teacher_subjects;
            $current_teacher["classes"] = $teacher_classes;
            array_push($newTeachers, $current_teacher);
            unset($current_teacher);
        }

        echo json_encode(array("msg" => "ok", "data" => $newTeachers));

    }else if ($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        require_once("../config.php");
        $delete_teacher_subject_statement = $pdo->prepare("DELETE FROM teacher_subject WHERE teacher_id=:id");
        $delete_teacher_subject_statement->bindValue(":id", (int) $id);
        $delete_teacher_subject_statement->execute();

        $delete_teacher_class_statement = $pdo->prepare("DELETE FROM techer_class WHERE teacher_id=:id");
        $delete_teacher_class_statement->bindValue(":id", $id);
        $delete_teacher_class_statement->execute();

        $delete_teacher_statement = $pdo->prepare("DELETE FROM teacher WHERE id=:id");
        $delete_teacher_statement->bindValue(":id",(int) $id);
        $delete_teacher_statement->execute();

        echo json_encode(array("msg" => "ok"));
    }
