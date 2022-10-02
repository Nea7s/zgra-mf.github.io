// 初期化
let rabi_data;


// アドレス変換
function Address(address) {
    return address / 4
}


// 難易度
function ToDifficulty(num) {
    let diff_list = [
        "CASUAL",
        "NOVICE",
        "NORMAL",
        "HARD",
        "HELL",
        "BUNNY EXTINCITION",
        "UNKNOWN",
        "IMPOSSIBLE",
    ] // imp以降 EXTRA -2 から+1ずつ

    // EXTRA分岐
    if (num > 7) {
        return `EXTRA ${-10 + num}`
    }
    else if (num >= 0) {
        return diff_list[num]
    }
    else {
        return "不明な難易度"
    }
}

//プレイ時間変換
function ToPlaytime(sec){
    let hour = Math.floor(sec / 36000);
    let min = Math.floor(sec % 36000 / 600);
    let rem = sec % 60;
    return `${hour}時間${min}分${rem}秒`;
}


// スピードラン確認
function Is_speedrun(num) {

    if (num > 0) {
        return "有効"
    }
    else {
        return "無効"
    };
}


// 内容書き込み
function Textedit(id, text) {
    document.getElementById(id).innerText = text;
}


// 情報表示
function ShowData() {
    let edit_list = [
        [
            "total_playtime",
            "total_runtime",
            "playtime",
            "difficulty",
            "hp",
            "speedrun",
            "en",
            "x",
            "y",
            "rumi_donuts",
            "rumi_cakes",
            "gold_carrot",
            "cocoa_bombs"
        ],
        [
            `全セーブデータ合計プレイ時間: ${ToPlaytime(rabi_data[Address(0x9954)])}`,
            `全セーブデータ合計スピードラン時間: ${ToPlaytime(rabi_data[Address(0x9950)])}`,
            `プレイ時間: ${ToPlaytime(rabi_data[Address(0x80b8)])}`,
            `難易度: ${ToDifficulty(rabi_data[Address(0x8118)])}`,
            `HP: ${rabi_data[Address(0x80a0)]}`,
            `スピードランフラグ ${Is_speedrun(rabi_data[Address(0x9a2c)])}`,
            `EN: ${rabi_data[Address(0x92ac)]}`,
            `X: ${rabi_data[Address(0x7084)]}`,
            `Y: ${rabi_data[Address(0x7088)]}`,
            `ルミのドーナツ: ${rabi_data[Address(0x7120)]}`,
            `ルミのケーキ: ${rabi_data[Address(0x7124)]}`,
            `ゴールドキャロット: ${rabi_data[Address(0x7128)]}`,
            `ココアボム: ${rabi_data[Address(0x712c)]}`
        ]
    ]

    for (let i=0; i < edit_list[0].length; ++i)
    {
        Textedit(edit_list[0][i], edit_list[1][i]);
    }
}


//ファイル読み込み
function ReadFile() {

    let reader = new FileReader();

    //読み込んだファイル
    let file = document.getElementById("file_").files[0];

    if (file.size != 69824) {
        document.getElementById("error_text").innerText = "選択されたファイルが適当ではありません。";
        return
    }

    document.getElementById("result").style.display = "block";
    // 読み込む
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
        rabi_data = new Uint32Array(reader.result);
        ShowData();
    }
}