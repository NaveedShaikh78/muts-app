<?php
require 'includes/connectdb.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n");
$conn = connect();
$id=$_POST['id'];
$rtype=$_POST['rtype'];
$opid=$_POST['opid'];
$opname=$_POST['opname'];
if($rtype=="getData")
{
  $sql="select * from operator";
}
elseif ($rtype == "insertData")
{
    $sql = "insert into operator(opid,opname) values('$opid','$opname')";
}
elseif ($rtype == "updateData")
{
    $sql = "update operator set opid='$opid', opname='$opname' where id ='$id'";
}
elseif ($rtype == "deleteData")
{
    $sql = "delete from  operator  where id ='$id'";
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
if ($rtype == "insertData")
  {
      print json_encode([mysql_insert_id()]);
      return;
  }
mysql_close($conn);
print json_encode($rows);
return;
?>
