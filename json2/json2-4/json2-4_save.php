<?php
$json = file_get_contents("php://input");
$data = json_decode($json, true); // 第二引数を指定しないと戻り値がオブジェクト型になる

// 2 csv 指定あった 配列毎にkey=values,区切りで出力 最後に改行

// function n_array_string(array $data = []): string // 配列を
// {
//   $string = ''; // 書きこむ文字列
//   foreach ($data as $key => $val) {
//     if (gettype($val) === "array") { // $valが配列であれば再帰呼び出しする
//       $val = n_array_string($val); // 配列 $valをforeachしている
//       // 呼び出し先の処理が終わりreturnされるとここに戻ってきてreturn値が$valに代入される $val = $string."\n"
//       $val = rtrim($val, ','); // $val最終行の "\n"を削除
//     }
//     $string .= $key . '=' . $val . ','; // stringにkey valueを追記
//   };
//   return $string;
// }
// $string = n_array_string($data);
// $file_n = "json2-4.csv";
// $current = file_get_contents($file_n);
// $current = $string . "\n";
// file_put_contents($file_n, $current);

$file_n = "json2-4.csv";
$current = file_get_contents($file_n);
foreach ($data as $key  => $val) {
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
$current = rtrim($current, ",");
$current .= "\n";
file_put_contents($file_n, $current);

// 送られたデータを再エンコードして返す

echo json_encode($data);
