<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        require_once("../config.php");
        $insert_fee_recevie_statement = $pdo->prepare("INSERT INTO `fee_recevied`(fee, student_id) VALUES (:fee, :student_id)");
        $insert_fee_recevie_statement->bindValue(":fee", (int)$data->amount);
        $insert_fee_recevie_statement->bindValue(":student_id",(int) $data->id);
        $insert_fee_recevie_statement->execute();
        echo json_encode(array("msg" => "ok"));
    }else if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");
        $select_fee_statement = $pdo->prepare("SELECT * FROM fee_recevied");
        $select_fee_statement->execute();
        $fees_data = $select_fee_statement->fetchAll(PDO::FETCH_ASSOC);
        $total_revenue_of_today = 0;
        $today_date = (int) date("d");
        foreach ($fees_data as $key => $fee) {
            $date_of_fee = (int) explode("-", $fee["recevied_at"])[2];
            if($date_of_fee === $today_date){
                $total_revenue_of_today += $fee["fee"];
            }
        }
        echo json_encode(array("msg" => "ok", "total_revenue" => $total_revenue_of_today));
    }
