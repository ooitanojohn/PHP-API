# API

## ajaxの基本
```
$.ajax({ // 通信方式,通信先,送信データを記述
            type: "GET",
            url: "./json2-1_save.php"
      })
      .done((msg, status, xhr) => { // 通信成功時 第一引数にdata 第二に通信状態 第三にいろいろ
        $("#output2").text(msg); // 受け取ったjsonデータそのまま表示
        var msg = JSON.parse(msg); // jsonを配列,オブジェクト(連想配列
        // Object 表示あれこれ 配列として取得している
        console.log(Object.keys(msg)); // OBjectのkey値取得
        console.log(Object.values(msg)); // Objectのvalue値取得
        console.log(Object.entries(msg)); //Objectのkey,value値取得
        console.log(Object.entries(msg)[0]); // Objectkeyvakue値の0番目取得
        console.log(Object.entries(msg)[0][0]); // Objectkeyvakue値の0番目の0番目
        // ループして表示 これがjsの使いやすいforeachみたいなもん
        for (const [key, value] of Object.entries(msg)) {
          $("#output3").append(`キー : ${key}  値 : ${value}` + "<br>");
        }
```