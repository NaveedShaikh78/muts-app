<?php
require 'includes/connectdb.php';
$conn = connect();
$st=$_GET["st"];
$et=$_GET["et"];
$ip=$_GET["ip"];
$sql="select count(*) as count from machinelog  where ioport=$ip and TIMESTAMPDIFF(SECOND,start_time,end_time)>20  and start_time between $st and $et";

  $retval = mysql_query( $sql, $conn );
  	if(! $retval )
 	 {
  	 	die('Could not get data: ' . mysql_error());
  	 }
 $rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  	{
		$rows[] = $row;
  	} 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n");
print json_encode($rows);
mysql_close($conn);
?>