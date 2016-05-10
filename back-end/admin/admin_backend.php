<?php
/**
 * Created by PhpStorm.
 * User: hao-enchang
 * Date: 4/26/16
 * Time: 11:18 PM
 */

session_start();

if(empty($_SESSION['username'])){
    header("Location: userAdmin.php");
}
$results_per_page = 5;
$page_num = $_GET['page'];
$first_page = 1;

require_once "db_connect.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="robots" content="noindex"/>
    <meta name="googlebot" content="noindex"/>
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
<!--     <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet">
 -->
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

        <ul class="nav navbar-top-links navbar-right">

            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">

                    <li class="divider"></li>
                    <li><a href="logout.php"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
                <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
        </ul>
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
        <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        報名者資料
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <class="dataTable_wrapper">
                            <table class="table table-striped table-bordered table-hover" >
                                <thead>
                                <tr>
                                    <th>姓名</th>
                                    <th>電話</th>
                                    <th>Email</th>
                                    <th>報名時間</th>
                                </tr>
                                </thead>
                                <tbody>
<?php



    $sql = "SELECT * FROM gap_member_list ORDER BY create_at DESC";

    $results = $mysqli->query($sql);

$num_results=$results->num_rows;
$last_page = ceil($num_results/ $results_per_page);

if(empty($page_num)){
    $page_num = $first_page;
}else{
    if($page_num < $first_page){
        $page_num = $first_page;
    }elseif($page_num > $last_page){
        $page_num = $last_page;
    }
}
$start_index = ($page_num-1) * $results_per_page;

$sql = $sql." LIMIT $start_index, $results_per_page";
$results = $mysqli->query($sql);

    if (!$results) {
        exit("SQL Error: " . $mysqli->error);
    }


    while ($row = $results->fetch_array()) {
        echo "<tr><td>" . $row['name'] . "</td>
                    <td>" . $row['phone'] . "</td>
                    <td>" . $row['email'] . "</td>
                    <td>" . $row['create_at'] . "</td>
                </tr>";
    };


?>

                                </tbody>

                            </table><div style="margin: 0 auto; width:30%">

                            <?php
                            if($page_num == $first_page){
                                ?>
                                <a href="<?php echo $_SERVER['PHP_SELF'] . "?page=$first_page" ?>" style="visibility: hidden">[<<
                                    First]</a>

                                <a href="<?php echo $_SERVER['PHP_SELF'] . "?page=".($page_num - 1) ?>" style="visibility: hidden; margin-right:10px">[<
                                    Previous]</a>

                                <?php
                            }

                            if($page_num > $first_page) {

                                ?>

                                <a href="<?php echo $_SERVER['PHP_SELF'] . "?page=$first_page" ?>">[<<
                                    First]</a>

                                <a href="<?php echo $_SERVER['PHP_SELF'] . "?page=".($page_num - 1) ?>" style="margin-right:10px">[<
                                    Previous]</a>
                                <?php
                            }
                            
                            echo "<strong style='font-size:16px'>".$page_num."</strong>";
                            
                            if($page_num < $last_page) {
                                ?>
                                <a href="<?php echo $_SERVER['PHP_SELF'] . "?page=" . ($page_num + 1) ?>" style="margin-left:10px">[Next>]</a>
                                <a href="<?php echo $_SERVER['PHP_SELF'] . "?page=$last_page" ?>" >[Last>>]</a>
                                <?php
                            }
                            ?>
                            </div>
                            

                    </div>
                    <!-- /.panel-body -->
                </div>
                <!-- /.panel -->
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <?php 
            echo "總共有 <a href='ppl_stats.php'><u>".$num_results."</u></a> 位報名者 "
        ?>

        <div style="margin:0 auto; width: 30%; margin-bottom: 20px">
        <form action="lottery.php"  method="post" style="float:left; margin-right:10px">
            <input type="submit" class="button" name="lottery" value="抽獎" />

        </form>
        <form method="post" action="excel_all.php">
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



