<?php
require_once("../vendor/autoload.php");

use Firebase\JWT\JWT;

if($_SERVER["REQUEST_METHOD"] === "GET"){
    echo "<h1>Hello world</h1>";
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $login_err = [];
    $data = json_decode(file_get_contents("php://input"));
    $teachername = $data->name;
    $password = $data->password;

    require_once("../config.php");
    $select_teacher_statement = $pdo->prepare("SELECT * FROM teacher WHERE name=:name");
    $select_teacher_statement->bindValue(":name", $teachername);
    $select_teacher_statement->execute();
    $teacher = $select_teacher_statement->fetch(PDO::FETCH_ASSOC);
    if($teacher){
        $is_teacher_authenticated = password_verify($password, $teacher["password"]);
        if($is_teacher_authenticated){
                $secret_key = "something";
                $payload = array(
                    "iss" => "localhost",
                    "iat" => time(),
                    "exp" => strtotime("+1 hour")
                );
                $jwt = JWT::encode($payload, $secret_key, "HS256");
                $new_teacher = array("name" => $teacher["name"], 'id' => $teacher['id']);

                echo json_encode(array("msg" => "ok", "jwt" => $jwt, "data" => $new_teacher ));
        }else {
                echo json_encode(array("err" => ["name or password is wrong"]));
        }
    }else {
                echo json_encode(array("err" => ["no teacher found with this name"]));
    }
}
