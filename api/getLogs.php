<?php
require 'includes/connectdb.php';
$conn = connect();
$dFrom=$_POST['start'];
$dTo=$_POST['end'];

$sql = "SELECT * FROM machinelog where srno between {$dFrom} and {$dTo}";

$retval = mysql_query( $sql, $conn );
$rows=[];
if(! $retval )
 {
	print json_encode([$sql]);
 }
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
{
	$rows[] = $row;
}
$sql = "SELECT srno FROM machinelog ORDER BY srno DESC LIMIT 1";

$retval = mysql_query( $sql, $conn );
$lasts=[];
if(! $retval )
 {
	print json_encode([$sql]);
 }
while($last = mysql_fetch_array($retval, MYSQL_ASSOC))
{
	$lasts[] = $last;
}
$arr = array('count'=>$lasts,'data' => $rows);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n");
print json_encode($arr);

mysql_close($conn);
?>
