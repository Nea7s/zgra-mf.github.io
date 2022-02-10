//グローバル
var tweet_list = [];
var iframe_text = "";

//ファイル 読み込み時処理
function input_event(evt) {
    
    //ファイル名代入
    let filename_ = document.getElementById("filename_");
    filename_.value = evt.target.files[0].name;

    //読み込み
    var reader = new FileReader();
    reader.readAsText(evt.target.files[0], "UTF-8");
    reader.onload = function (evt) {
        tweet_list = evt.target.result.split(/\n/);
        addDetails();
    }
    reader.onerror = function (e) {
        let errmes = new Array(
            "",
            "ファイルが見つかりません",
            "セキュリティエラーが検出されました",
            "ファイルの読込が中断されました",
            "ファイルの読み込み権限がありません",
            "ファイルサイズが大き過ぎます"
        );
        //エラーを出す
        alert(errmes[reader.error.code]);
    }
}

//iframe表示
function addDetails() {
    iframe_text = '結果表示中...<head><meta charset="UTF-8"><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></head><style>body {height:60px; display: grid; place-items: center;}</style>';
    for (var i in tweet_list) {
        iframe_text += `<br><blockquote class="twitter-tweet" data-lang="ja"><a href="${tweet_list[i]}?ref_src=twsrc%5Etfw"></a></blockquote>`;
    }
    let iframe = document.getElementById('frames');
    var blob = new Blob([iframe_text], { type: 'text/html' });
    iframe.src = URL.createObjectURL(blob);
}

//ダウンロード処理
function onbutton() {
    if (iframe_text == "") {
        alert("一覧を生成してください");
        return
    }
    const blob = new Blob([iframe_text], { type: 'text/plain' }); // Blob オブジェクトの作成
    const link = document.createElement('a');
    link.download = 'BookmarkList.html';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}