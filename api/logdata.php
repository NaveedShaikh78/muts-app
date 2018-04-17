<?php
  require 'includes/connectdb.php';
  $conn = connect();
  $st=str_replace("T"," ",$_GET["st"]);
  $et=str_replace("T"," ",$_GET["et"]);
  $ip=$_GET["ip"];
  $jn=0;
$sql = "SELECT @lastRecord:= srno,end_time,@totalidlesec:=TIMESTAMPDIFF(SECOND,end_time,str_to_date('$st','%Y-%m-%d %H:%i:%s')) from machinelog where ioport=$ip and srno=(SELECT MAX(srno) FROM machinelog  where ioport=$ip );";

$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 1 ".mysql_error());
   }
$sql = "select  @opid:=opid,@jobid:=jobid,@idleid:=idleid from machinestatus where ioport=$ip;";
 $retval = mysql_query( $sql, $conn );

$sql = "select * from machinelog where ioport=$ip and start_time='$st'";
$retval = mysql_query( $sql, $conn );

$num_rows = mysql_num_rows($retval);
 
$cycleTime= strtotime($et) - strtotime($st);
if($num_rows==0 && $cycleTime>20)
{
$sql = "UPDATE machinelog SET idletime=@totalidlesec where ioport=$ip and srno=@lastRecord;";

$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 2 ".mysql_error());
   }

$sql = "INSERT INTO machinelog( start_time, end_time, cycletime, ioport, jobno,opid) VALUES ('$st','$et',TIMESTAMPDIFF(SECOND,str_to_date('$st','%Y-%m-%d %H:%i:%s'),str_to_date('$et','%Y-%m-%d %H:%i:%s')),$ip,@jobid,@opid);";
error_log($sql);
$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 3 ".mysql_error());
  }

}
  echo "success";
mysql_close($conn);
?>
