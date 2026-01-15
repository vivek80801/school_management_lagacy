<?php
function calculate_fee($fee_recevied){
        $current_student = $fee_recevied[0];
        $current_student_id = $current_student["student_id"];
        $total_recevied_fee = 0;
        $students = [];
        $index_enabled = false;
        $today_date = (int) date("d");
        $today_month = (int) date("m");
        $today_year = (int) ("20" . (string) date("y"));

        for($i = 0; $i < count($fee_recevied); $i++) {
            $fee = $fee_recevied[$i];
            $new_student = array();
            if($index_enabled){
                $index_enabled = false;
            }
            if($current_student_id === $fee["student_id"]){
                $total_recevied_fee += (int) $fee["fee_recevied"];
            if( $i === (count($fee_recevied) - 1)){
                //$current_student_addmition_date = (int) explode("-", $current_student["created_at"])[2];
                $current_student_addmition_month = (int) explode("-", $current_student["created_at"])[1];
                $current_student_addmition_year = (int) explode("-", $current_student["created_at"])[0];

                // shohan takes addmition in 23-6-2023 and today date is 1-5-2024
                // first we subtract the years (2024 - 2023 = 1) 
                // now we see addmition month is greater then today month
                // second we subtract the months ( 5 - 6 = -1)
                // now we see the addmition date is greater then today da3y
                // third we subtract the dates ( 1 - 23 = -22)
                //
                // now 1 year = 12 months and 1 months = 30 days
                // (30 + (-22) = 8) date (12 + (-1) = 11) month
                // so, total is 8 day and 11 months
                
                $year_difference = $today_year - $current_student_addmition_year;
                $month_diffrence = $today_month - $current_student_addmition_month;
                //$date_diffrence = $today_date -  $current_student_addmition_date;

                //die($current_student_addmition_date);
                $due_year = $year_difference;
                $due_month = ($month_diffrence < 0 ? (12 + ($month_diffrence)) :$month_diffrence )+ (12 * $due_year);
                //$due_date = $date_diffrence < 0 ? (30 + ($date_diffrence)) :$date_diffrence;

                $total_required = $due_month * $current_student["fee_required"];
                $total_due = $total_required - $total_recevied_fee;

                $new_student["total_required"] = $total_required;
                $new_student["total_due"] = $total_due;
                $new_student["current_date"] = $today_year . "-" . $today_month . "-" . $today_date;

                $new_student["class"] = $current_student["class"];
                $new_student["created_at"] = $current_student["created_at"];
                $new_student["father_name"] = $current_student["father_name"];
                $new_student["father_work"] = $current_student["father_work"];
                $new_student["total_recevied"] = $total_recevied_fee;
                $new_student["current_student_required"] = $fee["fee_required"];
                $new_student["mother_name"] = $current_student["mother_name"];
                $new_student["mother_work"] = $current_student["mother_work"];
                $new_student["name"] = $current_student["name"];
                $new_student["roll_no"] = $current_student["roll_no"];
                $new_student["section"] = $current_student["section"];
                $new_student["student_id"] = $current_student["student_id"];
                $new_student["class_name"] = $current_student["class_name"];
                $new_student["section_name"] = $current_student["section_name"];
                array_push($students, $new_student);
                $total_recevied_fee = 0;
                $current_student = $fee;
                $current_student_id = $fee["student_id"];
                unset($new_student);
            }
            }else if($current_student_id !== $fee["student_id"] ){
                $current_student_addmition_date = (int) explode("-", $current_student["created_at"])[2];
                $current_student_addmition_month = (int) explode("-", $current_student["created_at"])[1];
                $current_student_addmition_year = (int) explode("-", $current_student["created_at"])[0];

                // shohan takes addmition in 23-6-2023 and today date is 1-5-2024
                // first we subtract the years (2024 - 2023 = 1) 
                // now we see addmition month is greater then today month
                // second we subtract the months ( 5 - 6 = -1)
                // now we see the addmition date is greater then today da3y
                // third we subtract the dates ( 1 - 23 = -22)
                //
                // now 1 year = 12 months and 1 months = 30 days
                // (30 + (-22) = 8) date (12 + (-1) = 11) month
                // so, total is 8 day and 11 months
                
                $year_difference = $today_year - $current_student_addmition_year;
                $month_diffrence = $today_month - $current_student_addmition_month;
                //$date_diffrence = $today_date -  $current_student_addmition_date;

                //die($current_student_addmition_date);
                $due_year = $year_difference;
                $due_month = ($month_diffrence < 0 ? (12 + ($month_diffrence)) :$month_diffrence )+ (12 * $due_year);
                //$due_date = $date_diffrence < 0 ? (30 + ($date_diffrence)) :$date_diffrence;

                $total_required = $due_month * $current_student["fee_required"];
                $total_due = $total_required - $total_recevied_fee;

                $new_student["total_required"] = $total_required;
                $new_student["total_due"] = $total_due;
                $new_student["current_date"] = $today_year . "-" . $today_month . "-" . $today_date;

                $new_student["class"] = $current_student["class"];
                $new_student["created_at"] = $current_student["created_at"];
                $new_student["father_name"] = $current_student["father_name"];
                $new_student["father_work"] = $current_student["father_work"];
                $new_student["total_recevied"] = $total_recevied_fee;
                $new_student["current_student_required"] = $fee["fee_required"];
                $new_student["mother_name"] = $current_student["mother_name"];
                $new_student["mother_work"] = $current_student["mother_work"];
                $new_student["name"] = $current_student["name"];
                $new_student["roll_no"] = $current_student["roll_no"];
                $new_student["section"] = $current_student["section"];
                $new_student["student_id"] = $current_student["student_id"];
                $new_student["class_name"] = $current_student["class_name"];
                $new_student["section_name"] = $current_student["section_name"];
                array_push($students, $new_student);
                $total_recevied_fee = 0;
                $current_student = $fee;
                $current_student_id = $fee["student_id"];
                $index_enabled = true;
                $i -= 1;
                unset($new_student);
            }
        }
        return $students;

}
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        require_once("../config.php");
        $select_fee_statement = $pdo->prepare("SELECT s.id as student_id, s.name, s.father_name, s.father_work, s.mother_name, s.mother_work, s.roll_no, s.class, s.section, s.created_at, fr.student_id as _student_id_, fr.fee as fee_recevied, c.id, c.class_name, se.id, se.section as section_name, fr.recevied_at, fs.fee as fee_required, fs.class FROM student s INNER JOIN fee_recevied fr ON s.id=fr.student_id INNER JOIN fee_structure fs ON s.class=fs.class INNER JOIN class c ON s.class=c.id INNER JOIN section se ON s.section=se.id");
        $select_fee_statement->execute();
        $fee_recevied = $select_fee_statement->fetchAll(PDO::FETCH_ASSOC);
        $students = calculate_fee($fee_recevied);
        echo json_encode(array("msg" => "ok", "data" => $students));
    }else if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->name;
        $class = $data->classForStudent;
        $section = $data->section;
        $roll_no = $data->rollNo;
        require_once("../config.php");
        $select_fee_statement = $pdo->prepare("SELECT s.id as student_id, s.name, s.father_name, s.father_work, s.mother_name, s.mother_work, s.roll_no, s.class, s.section, s.created_at, fr.student_id as _student_id_, fr.fee as fee_recevied, c.id, c.class_name, se.id, se.section as section_name, fr.recevied_at, fs.fee as fee_required, fs.class FROM student s INNER JOIN fee_recevied fr ON s.id=fr.student_id INNER JOIN fee_structure fs ON s.class=fs.class INNER JOIN class c ON s.class=c.id INNER JOIN section se ON s.section=se.id WHERE s.name like :name and s.class like :class and s.section like :section and s.roll_no like :roll_no");
        $select_fee_statement->bindValue(":name", "%".$name."%");
        $select_fee_statement->bindValue(":class", "%".$class."%");
        $select_fee_statement->bindValue(":section", "%".$section."%");
        $select_fee_statement->bindValue(":roll_no", "%".$roll_no."%");
        $select_fee_statement->execute();

        $student_with_fee = $select_fee_statement->fetchAll(PDO::FETCH_ASSOC);
        $students = calculate_fee($student_with_fee);

        echo json_encode(array("data" => $students, "msg" => "ok"));
    }

