//ロード時
window.onload = function () {
    let params = (new URL(document.location)).searchParams;
    let MMID = params.get('MMID');
    if (MMID) {
        Api_get(MMID);
        form.MMID.value = MMID;
    }
}


//APIのヘッダー
const hives = {
    "accept": "*/*",
    "x-csrf-token": ""
}


//結果を代入
function Set_value(MM_json) {
    //初プレイ計算
    let times = formats(MM_json["first_played"]);
    document.getElementById("first_played").textContent = times;
    delete MM_json.first_played;
    Set_LV(MM_json["xp"]);
    for (let i in MM_json) {
        document.getElementById(i).textContent = MM_json[i];
    }
}


//時間整形
function formats(dts) {
    let dt = new Date(dts * 1000);
    let y = dt.getFullYear();
    let m = ('00' + (dt.getMonth() + 1)).slice(-2);
    let d = ('00' + dt.getDate()).slice(-2);
    let h = ('00' + dt.getHours()).slice(-2);
    let mu = ('00' + dt.getMinutes()).slice(-2);
    let s = ('00' + dt.getSeconds()).slice(-2);
    return y + '/' + m + '/' + d + ' ' + h + ":" + mu + ":" + s;
}


//GetAPI
function Api_get(MMID) {
    fetch("https://api.playhive.com/v0/game/all/murder/"+MMID, headers=hives)
        .then(response => response.json()).then(texts => Set_value(texts))
        .catch(error => {
            if (error == "SyntaxError: Unexpected token < in JSON at position 0") {
                iserror(MMID);
            }
        });
}


//レベル計算
function Set_LV(xps) {
    let xp1 = xp2 = 0;
    for (let i = 1; i < 101; i++) {
        if (i <= 81) {
            xp1 += (i - 1) * 100;
            xp2 += i * 100;
        }
        else {
            xp1 += 8100;
            xp2 = xp1 + 8100;
        }
        if (xp1 <= xps && xps <= xp2) {
            document.getElementById("LV").textContent = i + 1;
            document.getElementById("NXP").textContent = xp2 - xps;
            break;
        }
    }
}

//エラー書き込み
function iserror (MMID){
    const result = document.getElementById("result");
    const li = document.createElement("div");
    li.className = "error";
    li.innerHTML = '<p>エラーが発生したよ!<br>アカウントが存在しない可能性があります<br><span style="color: red;">マイクラID : '+MMID+'</p>';
    result.appendChild(li);
}