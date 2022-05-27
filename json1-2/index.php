<?php
var_dump($_GET);
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

  <form id="GET" method="get">
    <input type="text" name="input" value="" />
    <input type="hidden" name="js" id="js" value=""></input>

    <button name="submit" id="submit">送信</button>
  </form>

  <article>
    <h2>GET受け取り値</h2>
    <pre></pre>
  </article>
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