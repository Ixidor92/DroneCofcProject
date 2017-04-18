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

//echo $_REQUEST['beach'];
echo json_encode($filenameArray);
?> 


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

//echo $_REQUEST['beach'];
echo json_encode($filenameArray);
?> 


