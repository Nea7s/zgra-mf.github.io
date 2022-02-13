//文字検索タイプ指定
const word_search = {
    "google": "https://www.google.com/search?q=",
    "youtube": "https://www.youtube.com/results?search_query=",
    "yandex": "https://yandex.com/search/?text=",
    "torrends": "https://search.torrends.to/"
}

//画像検索
const image_search = {
    "2": "https://ascii2d.net/search/url/"
}

//文字検索
function search_send(){
    let result = document.forms[0];
    window.location.href = `${word_search[result.search_type.value]}${encodeURI(result.q.value)}`;
}


function image_send(){
    let result = document.forms[0];
    window.location.href = `${image_search[result.search_type.value]}${encodeURI(result.q.value)}`;
}