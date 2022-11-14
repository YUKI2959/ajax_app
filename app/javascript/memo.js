const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  // 投稿ボタンがクリックされた時
  //投稿ボタンのクリックを無効化するためにpreventDefault
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    // getElementByIdメソッドで取得したフォームの要素を変数formに格納
    const form = document.getElementById("form");
    // FormDataオブジェクトを使って、フォームの値を取得
    const formData = new FormData(form);
    //非同期通信を行うためにXMLHttpRequestオブジェクトを生成
    const XHR = new XMLHttpRequest();
    //open()はリクエストの内容を指定するためのメソッド。データベースに保存したいので、HTTPメソッドにはPOST。
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    //サーバー側に送信
    XHR.send(formData);
    XHR.onload = () => {
      //200以外(リクエスト成功以外)のHTTPステータスコードが返された場合はエラーメッセージが表示されるように
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      //HTMLを描画する処理を記述
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      //  formText を空に
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);