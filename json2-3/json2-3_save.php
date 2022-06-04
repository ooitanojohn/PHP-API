<?php

$data = json_decode($_POST['value'], true); // 第二引数を指定しないと戻り値がオブジェクト型になる

// foreach($data as $key => $val){
//   $string .= $key.""
// }
$string = var_export($data);
$file = "json2-3.csv";
$current = file_get_contents($file);
$current = $string . "\n";
// file_put_contents($file, $current);

// $string = implode("", $data);


echo json_encode($data);
