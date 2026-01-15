<?php
require_once("./vendor/autoload.php");

use Firebase\JWT\JWT;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $login_err = [];
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->name;
    $password = $data->password;
    if (strlen($username) < 0) {
        array_push($login_err, "Please, enter a valid username");
    }
    if (strlen($username) < 5) {
        array_push($login_err, "User name can not be less then 5 characters");
    }
    if (strlen($username) > 30) {
        array_push($login_err, "User name can not be more then 30 characters");
    }
    if (strlen($password) < 0) {
        array_push($login_err, "Please, enter a valid password");
    }
    if (strlen($password) < 5) {
        array_push($login_err, "Password can not be less then 5 characters");
    }
    if (strlen($password) > 30) {
        array_push($login_err, "Password can not be more then 30 characters");
    }
    if (count($login_err) <= 0) {
        require_once("./config.php");
        $select_user_statement = $pdo->prepare("SELECT * FROM user WHERE name=:name");
        $select_user_statement->bindValue(":name", $username);
        $select_user_statement->execute();
        $user = $select_user_statement->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            $is_user_authenticated = password_verify($password, $user["password"]);
            if ($is_user_authenticated) {
                $secret_key = "something";
                $payload = array(
                    "iss" => "localhost",
                    "iat" => time(),
                    "exp" => strtotime("+1 hour")
                );
                $jwt = JWT::encode($payload, $secret_key, "HS256");
                $new_user = array("name" => $user["name"], "email" => $user["email"]);
                echo json_encode(array("msg" => "ok", "jwt" => $jwt, "data" => $new_user ));
            } else {
                echo json_encode(array("err" => ["username or password is wrong"]));
            }
        } else {
            echo json_encode(array("err" => ["username or password is wrong"]));
        }
    } else {
        echo json_encode(array("err" => $login_err));
    }
}
