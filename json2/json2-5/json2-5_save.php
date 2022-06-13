<?php

$num = $_GET['value']; // 読み込む数

$file = new SplFileObject(__DIR__ . '/json2-5.csv', 'r');
$file->setFlags(SplFileObject::SKIP_EMPTY | SplFileObject::DROP_NEW_LINE);

$string = '';

foreach ($file as $n => $line) {
  if ($line === false) continue;
  $string .= unserialize($line);
}

echo json_encode($string);
