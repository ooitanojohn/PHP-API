<?php
// アンケートcsv保存[post]
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $json = file_get_contents("php://input"); // データ受け取り
  $data = json_decode($json, true);

  $file_n = "json3-1.csv";
  $current = file_get_contents($file_n);
  foreach ($data as $key  => $val) { // データ加工
    if (is_array($val)) {
      $string = "";
      foreach ($val as $details) {
        $string .= $details;
      }
      $current .= $key . "=" . $string . ",";
    } else {
      $current .= $key . "=" . $val . ",";
    }
  }
  // csv 処理
  $current = rtrim($current, ",");
  $current .= "\n";
  file_put_contents($file_n, $current);
  echo json_encode($data);
}

// アンケートcsv取得
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $num = $_GET['number']; // リクエストに値がない場合 1を代入する
  if (is_null($_GET['number'])) {
    $num = 1;
  }
  if ($num < 1 || $num >= 10) { // 範囲外の場合400を返す
    http_response_code(400);
    echo '範囲外です';
    exit;
  }

  $csv = new SplFileObject(__DIR__ . '/json3-1.csv', 'r');
  $csv->setFlags(SplFileObject::READ_CSV);

  $count = 0;
  $data = [];
  $dist = [];
  foreach ($csv as $row) {
    if ($count >= $num) break; // 繰り返し回数
    if ($row === [null]) continue; // 最終行の処理
    foreach ($row as $val) {
      $temp = explode('=', $val);
      $key = $temp[0];
      $row = $temp[1];
      $data[$key] = $row;
    }
    $dist[] = $data;
    $count++;
  }
  http_response_code(200); // 200とjsonを返す
  echo json_encode($dist);
}
