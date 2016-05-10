<?php
/**
 * Created by PhpStorm.
 * User: hao-enchang
 * Date: 4/26/16
 * Time: 9:06 PM
 */

session_start();
require_once "db_connect.php";

//$username = $mysqli->real_escape_string($_POST['username']);
//$password = $mysqli->real_escape_string($_POST['password']);

$username = $_POST['username'];
$password= $_POST['password'];



//if(empty($username)){
//    header("Location: login.php");
//}

//   check if any required field is empty

if ($username== "webgene" && $password == "87682550") {
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        header("Location:admin_backend.php");


    } else if (empty($username) || empty($password)) {
        echo '<script type="text/javascript">alert("請輸入你的帳號或密碼！\nPlease enter your username or password!");</script>';
        include "login_form.php";
        exit();

    } else {
        echo '<script type="text/javascript">alert("登入帳號或密碼錯誤，請重試一次！\nIncorrect login credentials. Please try again!");</script>';
        include "login_form.php";
        exit();

    }


?>

