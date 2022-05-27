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
  <p><? echo $_POST['input'] ?></p>
  <p><? echo $_POST['js'] ?></p>
  <p><? var_dump(json_decode($_POST['js']))  ?></p>
</body>

</html>