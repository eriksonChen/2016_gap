
<?php

include "db_connect.php";

if(isset($_POST["export_Excel"]))
{
    // $filename = 'gap_member_list.csv';
    
    $sql = "SELECT * FROM gap_member_list";

    $results = $mysqli->query($sql);

    $num_rows = $results->num_rows;
    if($num_rows > 0)
    {
        $output .='<table class="table" bordered="1">
            <tr> 
                <th> id </th>
                <th> 姓名 </th>
                <th> 電話 </th>
                <th> Email </th>
                <th> 報名時間 </th>
            </tr>';

            while ($row = $results->fetch_array()){
                $output .= '<tr><td>'.$row["id"].'</td>
                                <td>'.$row["name"].'</td>
                                <td>'.$row["phone"].'/</td>
                                <td>'.$row["email"].'</td>
                                <td>'.$row["create_at"].'</td>
                            </tr>';
            } 
            $output .='</table>';

            header("Content-type: application/xls");
            header("Content-Disposition: attachment; filename=all_participants.xls");
            echo $output;

    }
    else
    {
        echo "There is no record in your Database";
    }
}

?>


