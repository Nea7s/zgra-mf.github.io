// index.html用

// コンストラクタ
function KonamiCode(callback) {
    this.callback = callback;
    this.code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    this.index = 0;
    this.keydownHandler = function (e) {
        if (e.keyCode === this.code[this.index]) {
            this.index++;
            if (this.index === this.code.length) {
                this.callback();
                this.index = 0;
            }
        } else {
            this.index = 0;
        }
    };
}

// 初期化
var konami = new KonamiCode(function () {
    alert('コナミコマンド発動！');
});

// イベントリスナー登録
document.addEventListener('keydown', function (e) {
    konami.keydownHandler(e);
});