<?php

$data = json_decode($_POST['value'], true); // 第二引数を指定しないと戻り値がオブジェクト型になる

// 2 csv 型保存できる serialize()で保存する
$string = serialize($data);
$file_n = "json2-4.csv";
$current = file_get_contents($file_n);
$current = $string . "\n";
file_put_contents($file_n, $current); // fopen,fwrite(),fcloseを続けて実行する関数

// csvから取り出して再エンコードして返す
$line = file_get_contents('./json2-4.csv'); // 一行読み込みなのでif
$data = unserialize($line);

echo json_encode($data);
