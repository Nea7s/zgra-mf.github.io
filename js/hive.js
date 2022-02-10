//APIのヘッダー
const hive_header = {
    "accept": "*/*",
    "x-csrf-token": ""
}



//ロード時
window.onload = function () {
    let params = (new URL(document.location)).searchParams;
    let mmid = params.get('mmid');
    if (mmid) {
        api_get(mmid);
        form.mmid.value = mmid;
    }
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
function api_get(mmid) {
    fetch(`https://api.playhive.com/v0/game/all/murder/${mmid}`, headers = hive_header)
        .then(response => response.json()).then(texts => Set_value(texts))
        .catch(error => {
            const error_ = document.getElementById("error");
            error_.innerText = "ユーザーが存在しません";
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