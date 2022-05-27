<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    p {
      border-bottom: 1px solid grey;
      padding-bottom: 5px;
    }
  </style>
</head>

<body>
  <p><? echo $_GET['input'] ?></p>
  <p><? echo $_GET['js'] ?></p>
  <p><? var_dump(json_decode($_GET['js']))  ?></p>
</body>

</html>