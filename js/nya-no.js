window.onload = function () {

    //コマンド取得
    fetch("../json/command.json")
        .then((respone) => {
            return respone.json()
        })
        .then((json_body) => {
            fomatter(json_body)
        });
}

//整形して表示
function fomatter(json_body) {

    //table取得
    const table = document.getElementById("cmd_table");

    for (let i in json_body) {

        //データ準備
        let json_data = json_body[i];

        //代入分岐
        if (json_data[1] != 1) {
            let html = `
            <tr>
                <th colspan=${json_data[1]}><p style="color: ${json_data[2]};">${json_data[0]}</p></th>
            </tr>
            `;
            table.insertAdjacentHTML("beforeend", html);
        }
        else {
            let html = `
            <tr>
                <th>${json_data[0]}</th>
                <th>${json_data[2]}</th>
                <th>${json_data[3]}</th>
            </tr>
            `;
            table.insertAdjacentHTML("beforeend", html);
        }
    }
}