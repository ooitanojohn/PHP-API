<?php

// 先生のjsonデータを返すAPI
$array = [
  [
    "name" => "asada",
    "gender" => '男',
    'blog' => [array(
      'name' => 'AsadaBlog',
      'published' => '2020-05-01',
      'url' => 'https://test1.jp/',
    ), [
      'name' => 'AsadaBlog',
      'published' => '2020-05-01',
      'url' => 'https://test1.jp/',
    ]],
    array(
      'name' => 'kawashima',
      'gender' => '男',
      'blog' => array(
        'name' => 'KawashimaBlog',
        'published' => '2020-06-11',
        'url' => 'https://test2.jp',
      )
    )
  ]
];

http_response_code(200);    //HTTPレスポンスコード(200正常終了)
header('Content-Type: application/json; charset=UTF-8');
header("X-Content-Type-Options: nosniff");

return json_encode($array, JSON_UNESCAPED_UNICODE);
