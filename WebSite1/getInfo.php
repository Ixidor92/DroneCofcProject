<?php
 header("Access-Control-Allow-Origin: *");
 
$filenameArray = array();
$handle = opendir(dirname(realpath(__FILE__)).'/Beaches/FollyBeach');

//$beachType = $_REQUEST['beach'];
$handle = opendir(dirname(realpath(__FILE__)).'/Beaches/'.$_REQUEST['beach']);

    while($file = readdir($handle)){
        if($file !== '.' && $file !== '..'){

            array_push($filenameArray, "$file");
        }
    }

 //echo file_get_contents('http://153.9.205.25/~aecom/WebSite1/www/Beaches/FollyBeach/DJI_0001.SRT');


echo json_encode($filenameArray);
?> 


