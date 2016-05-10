<?php
/**
 * Created by PhpStorm.
 * User: hao-enchang
 * Date: 4/27/16
 * Time: 7:12 PM
 */

//include "admin_backend.php";

session_start();

require_once "db_connect.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Gap Taiwan 活動</title>

    <!-- Bootstrap Core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <!-- <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet"> -->

    <!-- Custom CSS -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<div id="wrapper">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
           
            <a class="navbar-brand" href="admin_backend.php">Gap Taiwan 活動</a>
        </div>
        <!-- /.navbar-header -->

        <!-- <ul class="nav navbar-top-links navbar-right">

             <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">

                    <li class="divider"></li>
                    <li><a href="logout.php"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
                <! /.dropdown-user -->
            <!-- </li> -->
            <!-- /.dropdown -->
        <!-- </ul> -->
        <!-- /.navbar-top-links -->

        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">

                    <li>
                        <a href="admin_backend.php"><i class="fa fa-table fa-fw"></i> Tables</a>
                    </li>

                    <!-- /.nav-second-level -->

                </ul>
            </div>
            <!-- /.sidebar-collapse -->
        </div>
        <!-- /.navbar-static-side -->
    </nav>

    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Tables</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
<div class="row" >
    <div class="col-lg-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                中獎人資料
            </div>
            <!-- /.panel-heading -->
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>電話</th>
                            <th>Email</th>
                            <th>報名時間</th>
                        </tr>
                        </thead>
                        <tbody>

<?php


$lottery_id = array();
$winners_id = array();
$sql = "SELECT id FROM gap_member_list";

$results = $mysqli->query($sql);

if (!$results) {
    exit("SQL Error: " . $mysqli->error);
}

while ($row = $results->fetch_array()) {
    $lottery_id[] = $row['id'];
}

$last_index = count($lottery_id)-1;
$i = 0;

while($i!=4){

    // random number generator between first index(0) and last index
        $winners_id[$i]= $lottery_id[rand(0,$last_index)];


        // array_key_exists(value to check, array), only increment $i when none of the elements repeats
        if(!array_key_exists($winners_id[$i],$winners_id) ){
            $i++;
        }
}

$_SESSION['winners'] = $winners_id;


$sql_winner="SELECT * FROM gap_member_list WHERE id IN  ($winners_id[0], $winners_id[1], $winners_id[2], $winners_id[3])";

// echo $winners_id[0]." ,".$winners_id[1]." ,".$winners_id[2]." ,".$winners_id[3];

// while($i!=-1){
//     echo $lottery_id[$i]."<br>";
//     $i--;
// }

$result_winner=$mysqli->query($sql_winner);

if (!$result_winner) {
    exit("SQL Error: " . $mysqli->error);
}

$index = 1;
while($row = $result_winner->fetch_array()){
    echo "<tr><td>$index</td><td>" . $row['name'] . "</td><td>" . $row['phone'] . "</td><td>" . $row['email'] . "</td><td>" . $row['create_at'] . "</td></tr>";
    $index++;
}

?>
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
            </div>
            <!-- /.panel-body -->
        </div>
        <!-- /.panel -->
    </div>
    <!-- /.col-lg-6 -->

</div>
<!-- /.row -->
<a href="admin_backend.php">Back</a>

        <div style="margin:0 auto; width: 20%; margin-bottom: 20px">
       
        <form method="post" action="excel_winners.php">
            <input type="submit" value="匯入到Excel" name="export_Excel">

        </form>
        </div>


    </div>
    <!-- /#page-wrapper -->

</div>
<!-- /#wrapper -->

<!-- jQuery -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>

<!-- DataTables JavaScript -->
<script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
<script src="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>

<!-- Custom Theme JavaScript -->
<script src="dist/js/sb-admin-2.js"></script>



</body>

</html>