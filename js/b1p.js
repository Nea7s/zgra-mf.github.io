var str2array = function (str) {
    var array = [], i, il = str.length;
    for (i = 0; i < il; i++) array.push(str.charCodeAt(i));
    return array;
};
var str = "あいうえお",
    array = str2array(str),
    sjis_array = Encoding.convert(array, "SJIS", "UNICODE"),
    sjis = Encoding.codeToString(sjis_array); // 配列から文字列変換する関数は用意されている
alert(sjis);