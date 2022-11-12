<?php

$data = json_decode($_POST["value"]);

// var_dump($data);
// exit;

$string = implode(",", $data);
$file = "json2-2.csv";
$current = file_get_contents($file);
$current = $string . "\n";
file_put_contents($file, $current);

echo json_encode($data);
