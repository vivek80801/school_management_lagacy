<?php

    require_once("../vendor/autoload.php");
    
    use Firebase\JWT\JWT;

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        echo json_encode(array("msg" => "ok"));
    } else if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->name;
        $password = $data->password;
        require_once("../config.php");

        $select_student_statement = $pdo->prepare("SELECT * FROM student WHERE name=:name");
        $select_student_statement->bindValue(":name", $name);
        $select_student_statement->execute();
        $student = $select_student_statement->fetch(PDO::FETCH_ASSOC);
        if($student){
            $is_student_authenticated = password_verify($password, $student["password"]);
            if($is_student_authenticated){
                $secret_key = "something";
                $payload = array(
                    "iss" => "localhost",
                    "iat" => time(),
                    "exp" => strtotime("+1 hour")
                );
                $jwt = JWT::encode($payload, $secret_key, "HS256");
                $new_student = array("name" => $student["name"]);
                echo json_encode(array("msg" => "ok", "jwt" => $jwt, "data" => $new_student));
            }else {
                echo json_encode(array("err" => ["name or password is wrong"]));
            }
        }else {
            echo json_encode(array("err" => ["name or password is wrong"]));
        }
        //echo json_encode(array("msg" => "ok", "data" => $data));
    }
