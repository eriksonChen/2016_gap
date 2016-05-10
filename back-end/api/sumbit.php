<?php
/**
 * Created by PhpStorm.
 * User: hao-enchang
 * Date: 4/25/16
 * Time: 12:28 AM
 */

 session_start();

require_once "../admin/db_connect.php";
header('Content-Type: application/json');
date_default_timezone_set("Asia/Taipei");


$name = (isset($_POST['name']) && strlen(trim($_POST['name'])) > 0) ? $_POST['name']:'';
$phone = (isset($_POST['phone']) && strlen(trim($_POST['phone'])) > 0) ? $_POST['phone']:'';
$email = (isset($_POST['email']) && strlen(trim($_POST['email'])) > 0) ? $_POST['email']:'';
$signup_date = date('Y-m-d H:i:s', time());
$err   = NULL;

if( empty($name)) { $err .= 'name有誤！'; }
if( $phone =='') { $err .= 'phone有誤！'; }
if( $email=='') { $err .= 'email有誤！'; }
if( $err   == NULL ){
    $sql =  "SELECT * FROM gap_member_list WHERE phone = '$phone'";
    $results = $mysqli->query($sql);
    
    if(!$results){
        exit($mysqli->error);
    }
    $rc = $results->num_rows;

    if($rc ==0){
        $sql_insert = "INSERT INTO gap_member_list (name, phone, email, create_at)
                  VALUES ('$name', '$phone', '$email', '$signup_date')";
        $results_insert = $mysqli->query($sql_insert);

    }else{
        $err = "您已使用這電話號碼報名過了！";
    }
}

echo json_encode(array("err"=>$err));

