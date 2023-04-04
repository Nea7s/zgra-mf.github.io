const hive_header = {
    accept: "*/*",
    "x-csrf-token": "",
};

const formats = (dts) => {
    const dt = new Date(dts * 1000);
    const y = dt.getFullYear();
    const m = (`00${dt.getMonth() + 1}`).slice(-2);
    const d = (`00${dt.getDate()}`).slice(-2);
    const h = (`00${dt.getHours()}`).slice(-2);
    const mu = (`00${dt.getMinutes()}`).slice(-2);
    const s = (`00${dt.getSeconds()}`).slice(-2);
    return `${y}/${m}/${d} ${h}:${mu}:${s}`;
};

const setLV = (xps) => {
    let xp1 = xp2 = 0;
    for (let i = 1; i < 101; i++) {
        if (i <= 81) {
            xp1 += (i - 1) * 100;
            xp2 += i * 100;
        } else {
            xp1 += 8100;
            xp2 = xp1 + 8100;
        }
        if (xp1 <= xps && xps <= xp2) {
            document.getElementById("LV").textContent = i + 1;
            document.getElementById("NXP").textContent = xp2 - xps;
            break;
        }
    }
};

const setValues = (response) => {
    const times = formats(response["first_played"]);
    document.getElementById("first_played").textContent = times;
    delete response.first_played;
    setLV(response["xp"]);
    for (const [key, value] of Object.entries(response)) {
        console.log(key);
        document.getElementById(key).textContent = value;
    }
};

const apiGet = (mmid) => {
    fetch(`https://api.playhive.com/v0/game/all/murder/${mmid}`, {
        headers: hive_header,
    })
        .then((response) => response.json())
        .then((texts) => setValues(texts))
        .catch((error) => {
            alert(`取得エラー : ${error}`)
        });
};

window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const mcid = params.get("mcid");
    if (mcid) {
        form.mcid.value = mcid;
        apiGet(mcid);
    }
});
