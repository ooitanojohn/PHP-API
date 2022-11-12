<?php
require_once '../vendor/autoload.php';
function distNums($count)
{
  $faker = Faker\Factory::create('ja_JP');
  $nums = [];
  $tempNums = [];
  for ($i = 0; $i < $count; $i++) {
    $temp = '';
    $tempNums = $faker->randomElements(['1', '2', '3', '4', '5'], rand(1, 5));
    sort($tempNums);
    foreach ($tempNums as $val) {
      $temp .= $val;
    }
    $nums[] = $temp;
  }
  return $nums;
}
// namespace json\test;
// use json\fakerphp\faker;

$file_n = "json2-5.csv";
$current = file_get_contents($file_n);
$faker = Faker\Factory::create('ja_JP');

$string = ""; // id,name,gender,hobby,mobilephone,food
$count = 10;

for ($i = 0; $i < $count; $i++) {
  $string .= 'ID=' . $faker->randomNumber(5, false) . ','; //id
  $string .= 'name=' . $faker->name() . ','; // name
  $string .= 'gender=' . $faker->randomElement(['men', 'women']) . ','; // gender
  $nums = distNums(3);
  $string .= 'hobby=' . $nums[0] . ','; // 1~5 複数
  $string .= 'mobilephone=' . $nums[1] . ','; // 1~5 複数
  $string .= 'food=' .  $nums[2] . "\n"; // 1~5 複数
}

file_put_contents($file_n, $string);
