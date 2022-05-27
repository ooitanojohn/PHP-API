<?php
var_dump($_GET);
$input = '';
// $js['0'] = '';
// $js['1'] = '';
// $js['2'] = '';
// $js['3'] = '';
// $js['4']['xxx'] = '';
// $js['4']['yyy'] = '';
if (isset($_GET['submit'])) {
  $input = $_GET['input'];
  $js = json_decode($_GET['js']);
}
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <title>Document</title>
  <style>
    input {
      display: block;
    }
  </style>
</head>

<body>

  <form method="get">
    <input type="text" name="input" value="" />
    <input type="hidden" name="js" id="js" value=""></input>
    <button name="submit" id="submit">送信</button>
  </form>

  <h2>GET受け取り値</h2>
  <h3>入力値</h3>
  <p><? echo $input ?></p>
  <h3>jsの値</h3>
  <p><? echo isset($js['0']) === 1 $js['0']?  ?></p>
  <p><? echo isset($js['1']) === 1 $js['1']?  ?></p>
  <p><? echo isset($js['2']) === 1 $js['2']?  ?></p>
  <p><? echo isset($js['3']->a) === 1 $js['3']->a?  ?></p>
  <p><? echo isset($js['4']->xxx) === 1 $js['4']->xxx ? ?></p>
  <p><? echo isset($js['4']->yyy) === 1 $js['4']->yyy ? ?></p>

</body>
<script>
  const array = [
    'bar',
    '100',
    true,
    {
      'a': 'b'
    },
    {
      'xxx': 'baz',
      'yyy': 'barbaz'
    }
  ]
  const json_array = JSON.stringify(array);
  $("#js").val(json_array);
</script>

</html>