<?php

session_start();

include "db_connect.php";


// echo $_SESSION['winners'][0]." ".$_SESSION['winners'][1]." ".$_SESSION['winners'][2]." ".$_SESSION['winners'][3];
$winners = array();

$winners = $_SESSION['winners'];

    if(isset($_POST['export_Excel'])){

    $sql = "SELECT * FROM gap_member_list WHERE id IN ($winners[0], $winners[1], $winners[2], $winners[3])";
 

    $results = $mysqli->query($sql);
 

        $output .='<table class="table" bordered="1">
            <tr> 
                <th> id </th>
                <th> 姓名 </th>
                <th> 電話 </th>
                <th> Email </th>
                <th> 報名時間 </th>
            </tr>';
 



        while($row = $results->fetch_array()){
                $output .= '<tr><td>'.$row["id"].'</td>
                                <td>'.$row["name"].'</td>
                                <td>'.$row["phone"].'/</td>
                                <td>'.$row["email"].'</td>
                                <td>'.$row["create_at"].'</td>
                            </tr>';
                             
            }
            $output .='</table>';

            header("Content-type: application/xls");
            header("Content-Disposition: attachment; filename=prize_winners.xls");
            echo $output;

    }
    
?>