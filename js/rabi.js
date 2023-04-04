const addressToOffset = address => address / 4;

const difficultyToString = num => {
    const difficulties = [
        "CASUAL",
        "NOVICE",
        "NORMAL",
        "HARD",
        "HELL",
        "BUNNY EXTINCITION",
        "UNKNOWN",
        "IMPOSSIBLE",
        ...Array.from({ length: 4 }, (_, i) => `EXTRA ${-2 + i}`)
    ];
    return num >= 0 && num < difficulties.length
        ? difficulties[num]
        : "難易度不明";
};

const isSpeedrunValid = num => num > 0 ? "有効" : "無効";
const setText = (id, text) => {
    document.getElementById(id).textContent = text;
}

function ToPlaytime(sec) {
    const hour = Math.floor(sec / 36000);
    const min = Math.floor((sec % 36000) / 600);
    const rem = sec % 60;
    return `${hour}時間${min}分${rem}秒`;
}

function updateData(rabiData) {
    const editList = [
        {
            id: "total_playtime",
            text: `全セーブデータ合計プレイ時間: ${ToPlaytime(
                rabiData[addressToOffset(0x9954)]
            )}`,
        },
        {
            id: "total_runtime",
            text: `全セーブデータ合計スピードラン時間: ${ToPlaytime(
                rabiData[addressToOffset(0x9950)]
            )}`,
        },
        {
            id: "playtime",
            text: `プレイ時間: ${ToPlaytime(rabiData[addressToOffset(0x80b8)])}`,
        },
        {
            id: "difficulty",
            text: `難易度: ${difficultyToString(rabiData[addressToOffset(0x8118)])}`,
        },
        { id: "hp", text: `HP: ${rabiData[addressToOffset(0x80a0)]}` },
        {
            id: "speedrun",
            text: `スピードランフラグ ${isSpeedrunValid(rabiData[addressToOffset(0x9a2c)])}`,
        },
        { id: "en", text: `EN: ${rabiData[addressToOffset(0x92ac)]}` },
        { id: "x", text: `X: ${rabiData[addressToOffset(0x7084)]}` },
        { id: "y", text: `Y: ${rabiData[addressToOffset(0x7088)]}` },
        {
            id: "rumi_donuts",
            text: `ルミのドーナツ: ${rabiData[addressToOffset(0x7120)]}`,
        },
        {
            id: "rumi_cakes",
            text: `ルミのケーキ: ${rabiData[addressToOffset(0x7124)]}`,
        },
        {
            id: "gold_carrot",
            text: `ゴールドキャロット: ${rabiData[addressToOffset(0x7128)]}`
        },
        {
            id: "cocoa_bombs",
            text: `ココアボム: ${rabiData[addressToOffset(0x712c)]}`
        }
    ];

    for (let i = 0; i < editList.length; ++i) {
        const _id = editList[i].id;
        const _text = editList[i].text;
        console.log(_id, _text);
        setText(_id, _text);
    }
}

function ReadFile() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    const errorText = document.getElementById("error_text");
    const resultDiv = document.getElementById("result");

    if (file.size !== 69824) {
        errorText.textContent = "選択されたファイルが適切ではありません。";
        return;
    }

    resultDiv.style.display = "block";

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function () {
        const rabiData = new Uint32Array(reader.result);
        updateData(rabiData);
    };
}
