<?php

// 先生のjsonデータを返すAPI
$array = [
  [
    "name" => "asada",
    "gender" => '男',
    'blog' => [array(
      'name' => 'AsadaBlog',
      'published' => '2020-05-01',
      'url' => 'https://test1-2.jp/',
    ), [
      'name' => 'AsadaBlog2',
      'published' => '2020-06-01',
      'url' => 'https://test1-1.jp/',
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

echo json_encode($array);
