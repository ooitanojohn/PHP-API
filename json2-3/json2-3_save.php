<?php

$data = json_decode($_POST['value'], true); // 第二引数を指定しないと戻り値がオブジェクト型になる


// 連想配列を文字列として表現 あれこれ
// https://suin.io/526
// http_build_query() → get送信する分にはいいが型情報を保存しない。値のみ
// jsonencode() → nosqlはjson形式らしいので多分これ
// serialize() → 型情報保存できる
// var_export() → ?


// csvに保存するときとはどういう状況の時?
// プログラマ的にはserialize()
// NoSQLだとjson_encord()

// $data = array(
//   'bool'   => true,
//   'int'    => 1,
//   'float'  => 1.23,
//   'string' => 'foobar',
//   'array'  => array('apple', 'orange', 'strawberry'),
//   'key-value' => array(
//     'jp' => 'Japan',
//     'us' => 'USA',
//     'cn' => 'China',
//   ),
// );

// 1 fopen fwrite fclose (x 再帰的に書かないとkey valueの単純な1次元配列しか処理できない)
// $file_n = "json2-3.csv";
// $fp = fopen($file_n, "w");
// foreach ($data as $key => $val) {
//   fwrite($fp, $key . "," . $val . "\n");
// };
// fclose($fp);


// 2 csv 型保存できる serialize()で保存する
$string = serialize($data);
$file_n = "json2-3.csv";
$current = file_get_contents($file_n);
$current = $string . "\n";
file_put_contents($file_n, $current); // fopen,fwrite(),fcloseを続けて実行する関数

// csvから取り出して再エンコードして返す
$line = file_get_contents('./json2-3.csv'); // 一行読み込みなのでif
$data = unserialize($line);

echo json_encode($data);
