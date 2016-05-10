<?php
/**
 * Created by PhpStorm.
 * User: hao-enchang
 * Date: 4/25/16
 * Time: 12:22 AM
 */

header('Content-Type: text/html; charset=utf-8');

$host = "211.78.85.201";
$username = "gap_lls";
$password = "ne3ri5fvk2";
$database = "gap_lls_db";

$mysqli = new mysqli($host, $username, $password, $database);

if($mysqli->error){
    exit($mysqli->error);
}
mysqli_set_charset($mysqli, "utf8");


