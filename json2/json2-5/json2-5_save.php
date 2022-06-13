<?php

$num = $_GET['value']; // 読み込む数

$file = new SplFileObject(__DIR__ . '/json2-5.csv', 'r');
$file->setFlags(SplFileObject::SKIP_EMPTY | SplFileObject::DROP_NEW_LINE);

$string = '';
// while ($file || $num > 0) {
// }
foreach ($file as $n => $line) {
  if ($line === false) continue;
  $string .= unserialize($line);
}

echo json_encode($string);
// for ($i = 0; $i < $data; $i++) {
//   if ($line === false) continue;
//   echo "$line", PHP_EOL;
// }
