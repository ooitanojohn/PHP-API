# js

## [これ読めば載ってる](https://uhyohyo.net/javascript/3_5.html)

## トークン 正規表現のパターンチェック
```js
  // トークンチェック
let regex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/); // 正規表現パターン

input_token.addEventListener('change', () => { // トークンチェック
  if (regex.test(input_token.value)) {
    button_login.removeAttribute('disabled'); // 有効
  } else {
    button_login.setAttribute('disabled', true); // 無効
  }
  // console.log(input_token.value)
});
```

## [複数回dom追加操作しているなら](https://qiita.com/39_isao/items/2fa8faed283d455f4181)
- createDocumentFragmentでdomツリー作って追加する
```js navタグにul,pを追加する
let fragment = document.createDocumentFragment();
      const nav = document.querySelector('nav');

      for (let key in return_data) {
        const navUl = document.createElement('ul'); // navの子要素
        navUl.id = `category-${return_data[key].id}`;
        const navUlP = document.createElement('p'); // navUlの子要素
        navUlP.id = `category-${return_data[key].id}-${return_data[key].name}`;
        navUlP.textContent = return_data[key].name
        navUl.appendChild(navUlP);
        fragment.appendChild(navUl);
      }
      nav.appendChild(fragment); // 一回で済む
```

## 子孫要素のイベント発火は親要素に伝搬する為、親要素のe引数にイベント情報が伝わる
- nav.ul.li → li click
- nav.addEventListener('click', (e) => { e.etc...})  etc = target,[composedPath](https://developer.mozilla.org/ja/docs/Web/API/Event/composedPath)
- eをコンソールログで出して確認
```js
nav.addEventListener('click', (e) => { // degelationで判別
  // console.log(e.composedPath())
  const ul = e.composedPath()[1]; // 操作された親要素定義 = ul
}
```
### [jqueryだが...発火したイベントタグ以外の兄弟要素のタグを取得する](https://qiita.com/lv-kit/items/f707910c4aec7bbf53f4)
- .siblings()
```js
let anotherUl = $(e.composedPath()[1]).siblings() // 自分以外のul要素を取得
```

## 子要素削除パターン これは最初の子要素を残してそれ以外を削除するもの
- 疑問:残したい要素がある場合はnode選択してifで省くしかない？
```js
while (anotherUl[i].hasChildNodes()) { // 子要素削除
      if (anotherUl[i].childNodes.length === 1) { break; } // 要素が一つになると終了
      anotherUl[i].removeChild(anotherUl[i].childNodes[1]);
    }
```

## form aタグのデフォルトイベントを止める
- event.preventDefault()
## [イベントを子、孫要素で発火させた時にそこの要素で処理を止める (親要素に伝搬させない)](https://gxy-life.com/2PC/PC/PC20220129.html)
- event.stopPropagation()
## [タグの属性で発火した時にscript,引数指定する](https://segakuin.com/html/attribute/onclick.html)
```js
ulLi.setAttribute('onclick', 'selectedlist(arguments[0], this);event.stopPropagation()') // memo編集用の発火イベント
```


## [jQueryでいう$(()=>{ })とは](https://developer.mozilla.org/ja/docs/Web/API/GlobalEventHandlers/onload)
- windows.onload 読み込みが終わってから処理する(処理によっては不具合が出るものもあるので)

### 参考リンク

- [jQuery ajax操作](https://www.koikikukan.com/archives/2012/10/02-005555.php)
- [jQuery DOM操作](https://qiita.com/nishiurahiroki/items/5fe52bbcbb91d3181bbd#%E5%AE%9A%E7%BE%A9)
- [文字列処理](https://zenn.dev/mkosakana/articles/87d584e87a18b7#%E5%AF%BE%E8%B1%A1%E3%81%AE%E6%96%87%E5%AD%97%E5%88%97.replace(-%E7%BD%AE%E6%8F%9B%E5%89%8D%E3%81%AE%E6%96%87%E5%AD%97%E5%88%97%2C-%E7%BD%AE%E6%8F%9B%E5%BE%8C%E3%81%AE%E6%96%87%E5%AD%97%E5%88%97-)%3B)
- [Node,element](https://qiita.com/takeshisakuma/items/9e0c3b9800c307740593)