<?php

	require 'includes/connectdb.php';
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');
	print("\n");
	$conn = connect();
	$id = $_POST['srno'];
	$jobid = $_POST['jobno'];
	$opid = $_POST['opid'];
	$rtype = $_POST['rtype'];
	if($rtype == "updateData"){
		$sql = "update machinelog set jobno='$jobid', opid='$opid' where srno='$id'";
	}

	$retval = mysql_query( $sql, $conn );

  if(! $retval )
  {
	print json_encode([$sql]);
	die('');
  }

$rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  {
  $rows[] = $row;
  }
/*  if ($rtype == "insertData")
  {
      print json_encode([mysql_insert_id()]);
      return;
  }
  */
mysql_close($conn);

print json_encode($rows);
return;

?>
