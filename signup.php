<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $sign_up_err = [];
        $data = json_decode(file_get_contents('php://input'));
        $username = $data->name;
        $email = $data->email;
        $password = $data->password;
        if(strlen($username) < 0){
            array_push($sign_up_err, "Please, enter a valid username");
        }
        if(strlen($username) < 5){
            array_push($sign_up_err, "User name can not be less then 5 characters");
        }
        if(strlen($username) > 30){
            array_push($sign_up_err, "User name can not be more then 30 characters");
        }
        if(strlen($email) < 0){
            array_push($sign_up_err, "Please, enter a valid email");
        }
        if(strlen($email) < 5){
            array_push($sign_up_err, "Email can not be less then 5 characters");
        }
        if(strlen($email) > 30){
            array_push($sign_up_err, "Email can not be more then 30 characters");
        }
        if(strlen($password) < 0){
            array_push($sign_up_err, "Please, enter a valid password");
        }
        if(strlen($password) < 5){
            array_push($sign_up_err, "Password can not be less then 5 characters");
        }
        if(strlen($password) > 30){
            array_push($sign_up_err, "Password can not be more then 30 characters");
        }
        if(count($sign_up_err) > 0){
            echo json_encode(array("err" => $sign_up_err));
        }else{
            $new_password = password_hash($password, PASSWORD_DEFAULT);
            require_once("./config.php");
            $select_user_statement = $pdo->prepare("SELECT * FROM user WHERE name=:name");
            $select_user_statement->bindValue(":name", $username);
            $select_user_statement->execute();
            $user = $select_user_statement->fetch(PDO::FETCH_ASSOC);
            if($user){
                array_push($sign_up_err, "User name already exist, Please choose a different name");
                echo json_encode(array("err" => $sign_up_err));
            }else{
                $user_statement = $pdo->prepare("INSERT INTO user (name, email, password) VALUES(:name, :email, :password)");
                $user_statement->bindValue(":name", $username);
                $user_statement->bindValue(":email", $email);
                $user_statement->bindValue(":password", $new_password);
                $user_statement->execute();
                echo json_encode(array('msg' => "ok"));
            }

        }
    }
