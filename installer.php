<?php
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        if(isset($_POST["host_name"]) &&
            isset($_POST["port"]) &&
            isset($_POST["database_name"]) &&
            isset($_POST["database_user"]) &&
            isset($_POST["database_password"])
        ){
            $host = $_POST["host_name"];
            $port = $_POST["port"];
            $database_name = $_POST["database_name"];
            $database_user = $_POST["database_user"];
            $database_password = $_POST["database_password"];

            //$pdo = new PDO("mysql:host=${host};port=${port};dbname=${db_name}", $db_user, $db_password);
            //session_start();
            
            $is_file_created = file_put_contents("./config.php", "
                <?php
                        \$host = '$host';
                        \$port = '$port';
                        \$db_name = '$database_name';
                        \$db_user = '$database_user';
                        \$db_password = '$database_password';
                        \$pdo = new PDO(\"mysql:host=\${host};port=\${port};dbname=\${db_name}\", \$db_user, \$db_password);

                        session_start();
                    ?>
                ");

            $pdo = new PDO("mysql:host=${host};port=${port};dbname=${database_name}", $database_user, $database_password);
            $create_user_table = "
                    CREATE TABLE user (
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        password VARCHAR(256) NOT NULL
                    )
           ";

            $create_student_table = "
                    CREATE TABLE student (
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        father_name VARCHAR(255) NOT NULL,
                        father_work VARCHAR(255) NOT NULL,
                        mother_name VARCHAR(255) NOT NULL,
                        mother_work VARCHAR(255) NOT NULL,
                        roll_no INT NOT NULL,
                        class INT NOT NULL,
                        section INT NOT NULL,
                        created_at DATE NOT NULL,
                        password VARCHAR(256) NOT NULL
                    )
           ";
            $create_class_table = "
                CREATE TABLE class(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        class_name VARCHAR(255) NOT NULL
                   )
            ";

            $create_section_table = "
                CREATE TABLE section(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        section VARCHAR(255) NOT NULL
                   )
            ";

            $create_fee_table = "
                CREATE TABLE fee_structure(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        class INT NOT NULL,
                        fee INT NOT NULL
                   )
            ";

            $create_announcement_table = "
                CREATE TABLE announcement(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        description VARCHAR(1025) NOT NULL
                   )
            ";

            $create_homework_table = "
                CREATE TABLE homework(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        class INT NOT NULL,
                        section INT NOT NULL,
                        subject INT NOT NULL,
                        homework VARCHAR(1025) NOT NULL,
                        created_by INT NOT NULL
                   )
            ";

            $create_teacher_table = "
                CREATE TABLE teacher(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        password VARCHAR(1025) NOT NULL
                   )
            ";

            $create_teacher_subject_table = "
                CREATE TABLE teacher_subject(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        subject_id INT NOT NULL,
                        teacher_id INT NOT NULL
                   )
            ";

            $create_teacher_class_table = "
                CREATE TABLE teacher_class(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        class_id INT NOT NULL,
                        teacher_id INT NOT NULL
                   )
            ";

            $create_staff_table = "
                CREATE TABLE staff(
                        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        work VARCHAR(255) NOT NULL
                   )
            ";

            $pdo->prepare($create_user_table)->execute();
            $pdo->prepare($create_student_table)->execute();
            $pdo->prepare($create_class_table)->execute();
            $pdo->prepare($create_section_table)->execute();
            $pdo->prepare($create_fee_table)->execute();
            $pdo->prepare($create_announcement_table)->execute();
            $pdo->prepare($create_homework_table)->execute();
            $pdo->prepare($create_teacher_table)->execute();
            $pdo->prepare($create_teacher_class_table)->execute();
            $pdo->prepare($create_teacher_subject_table)->execute();
            $pdo->prepare($create_staff_table)->execute();
          $pdo = null;

            header("Location ./index.php");
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installer School Management System</title>
</head>
<body>
    <h1>School Management System Installer</h1>
    <form action="./installer.php" method="post">
        <div class="form-group">
            <label for="host">Host Name:</label>
            <input type="text" name="host_name" required />
        </div>
        <div class="form-group">
            <label for="port">Port:</label>
            <input type="text" name="port" required />
        </div>
        <div class="form-group">
            <label for="database_name">Database Name:</label>
            <input type="text" name="database_name" required />
        </div>
        <div class="form-group">
            <label for="database_user">Database User:</label>
            <input type="text" name="database_user" required />
        </div>
        <div class="form-group">
            <label for="database_password">Database Password:</label>
            <input type="text" name="database_password"  />
        </div>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
