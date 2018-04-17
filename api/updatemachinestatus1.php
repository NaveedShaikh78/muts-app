<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require 'includes/connectdb.php';
$conn = connect();
$st=$_POST["st"];
$ip=$_GET["ip"];
$ss=$_POST["ss"];
$type=$_POST["type"];
$tval=$_POST["tval"];
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
  die("Fail 1".mysql_error);
  }

print json_encode( ["success"]);
mysql_close($conn);
?>
