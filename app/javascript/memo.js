function post (){
  const submit = document.getElementById("submit");
  // 投稿ボタンがクリックされた時
  submit.addEventListener("click", () => {
    //投稿ボタンのクリックを無効化するためにpreventDefault
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      // getElementByIdメソッドで取得したフォームの要素を変数formに格納
      const form = document.getElementById("form");
      // FormDataオブジェクトを使って、フォームの値を取得
      const formData = new FormData(form);
      //非同期通信
      const XHR = new XMLHttpRequest();
      //データベースに保存したいのでPOST
      XHR.open("POST", "/posts", true);
      XHR.responseType = "json";
      //サーバー側に送信
      XHR.send(formData);
    });
  });
};

window.addEventListener('load', post);