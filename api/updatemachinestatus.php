<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require 'includes/connectdb.php';
$conn = connect();
$st=isset($_GET['st']) ? $_GET['st'] : "";
$ip=isset($_GET['ip']) ? $_GET['ip'] : "";
$ss=isset($_GET['ss']) ? $_GET['ss'] : "";
$type=isset($_GET['type']) ? $_GET['type'] : "";
$tval=isset($_GET['tval']) ? $_GET['tval'] : "";
if($type=="op")
  {
    $sql = "UPDATE machinestatus SET opid=$tval where ioport=$ip;";
  }
else if($type=="job")
  {
    $sql = "UPDATE machinestatus SET jobid=$tval where ioport=$ip;";
  }
else if($type=="idle")
  {
	$sql = "UPDATE machinestatus SET idleid=$tval where ioport=$ip;";
  }

else
   {
    $sql = "UPDATE machinestatus SET statetime=$st,status=$ss where ioport=$ip;";
   }
$retval = mysql_query($sql , $conn);
if(!$retval)
  {
  die("Fail 1".$sql);
  }

print json_encode( ["success"]);
mysql_close($conn);
?>
