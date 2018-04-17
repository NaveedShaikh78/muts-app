<?php
require 'includes/connectdb.php';
$conn = connect();
$st=str_replace("T"," ",$_GET["st"]);
$et=str_replace("T"," ",$_GET["et"]);
$jobno=$_GET["jobno"];
$jobs=$_GET["jobs"];
if(isset($jobs))
{
$sql=<<<EOT
select 
	 t.cycledate, count(*) DayTotal, t.jobname as JobName
from (select 
              jobno as jobno,
			  ioport as ioport,
      		  DATE(start_time) as cycledate,
      		  start_time as start_time,
			  jobname as jobname
	  from 
	  machinelog inner join job
	  on
	  machinelog.jobno =job.id 
	  where cycletime>20 and start_time between $st and $et
	 ) t group by  t.cycledate, t.jobname
EOT;
}
else
{
$sql=<<<EOT
select 
	 t.cycledate, count(*) DayTotal, t.jobname as JobName
from (select 
              jobno as jobno,
			  ioport as ioport,
      		  DATE(start_time) as cycledate,
      		  start_time as start_time
      from 
	  machinelog inner join job
	  on 
	  machinelog.jobno =job.id 
	  where cycletime>20 and jobno=$jobno and start_time between $st and $et
	 ) t group by  t.cycledate, t.jobname
EOT;
}
  	$retval = mysql_query( $sql, $conn );
   	if(! $retval )
 	 {
  	 	die('Could not get data:$sql--- ' . mysql_error());
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