<?php

// ステータスコード
// if ($_SERVER["REQUEST_METHOD"] !== 'GET') { // get送信のみ
//   http_response_code(401);
//   echo 'リクエストメソッドはGETを利用してください';
//   exit;
// }
$num = $_GET['number']; // 読み込む数
if ($num < 1 || $num >= 10) { // 1~9の間のみ
  http_response_code(400);
  echo '範囲外です';
  exit;
}

$csv = new SplFileObject(__DIR__ . '/json2-5.csv', 'r');
$csv->setFlags(SplFileObject::READ_CSV);

$count = 0;
$data = [];
$dist = [];
foreach ($csv as $row) {
  if ($count >= $num) break; // 繰り返し回数
  if ($row === [null]) continue; // 最終行の処理
  foreach ($row as $vals) {
    $temp = explode('=', $vals);
    $key = $temp[0];
    $row = $temp[1];
    $data[$key] = $row;
  }
  $dist[] = $data;
  $count++;
}
// var_dump($dist);

http_response_code(200); // 200とjsonを返す
echo json_encode($dist);
