<?PHP 

// get all name file .png from assets

// allow access from all origin
header('Access-Control-Allow-Origin: *');

$files = glob('../assets/phu/*.png');
$array = [];
foreach($files as $file) {
    $array[] = explode(".",basename($file))[0];
}

echo json_encode($array);