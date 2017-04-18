<?php
 header("Access-Control-Allow-Origin: *");
 
//$filenameArray = array();
//$handle = opendir(dirname(realpath(__FILE__)).'/Beaches/FollyBeach');

//$beachType = $_REQUEST['beach'];

 echo file_get_contents('http://153.9.205.25/~aecom/WebSite1/www/Beaches/'.$_REQUEST['beach'].'/'.$_REQUEST['srtFile']);

//echo file_get_contents('http://153.9.205.25/~aecom/WebSite1/www/Beaches/FollyBeach/'.$_REQUEST['srtFile']);


//echo json_encode($filenameArray);
?> 


