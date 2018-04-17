<?php
function connect(){
 $dbhost = 'localhost:3306';
   $dbuser = 'navee_logger';
   $dbpass = '@z@zu66iN';
   $dbname = 'naveedajaj2_logger';

   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
  if(!$conn )
	{
  	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db($dbname);
	return $conn;
}
?>