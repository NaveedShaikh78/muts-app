<?php
function connect(){
 $dbhost = 'localhost:3306';
   $dbuser = 'harisaut_global';
   $dbpass = '@z@zu66iN';
   $dbname = 'harisaut_global';

   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
  if(!$conn )
	{
  	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db($dbname);
	return $conn;
}
?>