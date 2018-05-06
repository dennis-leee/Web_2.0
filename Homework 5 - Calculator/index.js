//说明
window.onload = function () {
    var illustrate = "说明：\n1.支持键盘输入（ESC键对应CE）\n2.**为幂运算，如2 ** 3 = 8";
    alert(illustrate);
}

//键盘输入
document.onkeydown = function (event) {
    if ((event.keyCode == 48 || event.keyCode == 96) && !event.shiftKey) {getOperate(0); }
    if (event.keyCode == 49 || event.keyCode == 97) {getOperate(1); }
    if (event.keyCode == 50 || event.keyCode == 98) {getOperate(2); }
    if (event.keyCode == 51 || event.keyCode == 99) {getOperate(3); }
    if (event.keyCode == 52 || event.keyCode == 100) {getOperate(4); }
    if (event.keyCode == 53 || event.keyCode == 101) {getOperate(5); }
    if (event.keyCode == 54 || event.keyCode == 102) {getOperate(6); }
    if (event.keyCode == 55 || event.keyCode == 103) {getOperate(7); }
    if ((event.keyCode == 56 || event.keyCode == 104) && !event.shiftKey) {getOperate(8); }
    if ((event.keyCode == 57 || event.keyCode == 105) && !event.shiftKey) {getOperate(9); }
    if (event.keyCode == 106 || (event.keyCode == 56 && event.shiftKey)) {getOperate('*'); }
    if ((event.keyCode == 107) || (event.keyCode == 187 && event.shiftKey)) {getOperate('+'); }
    if (event.keyCode == 109 || event.keyCode == 189) {getOperate('-'); }
    if (event.keyCode == 110 || event.keyCode == 190) {getOperate('.'); }
    if (event.keyCode == 111 || event.keyCode == 191) {getOperate('/'); }
    if (event.keyCode == 8) {getOperate('←'); }
    if (event.keyCode == 27) {getOperate('CE'); }
    if ((event.keyCode == 13 || event.keyCode == 187) && !event.shiftKey) {getOperate('='); }
    if (event.keyCode == 57 && event.shiftKey) {getOperate('('); }
    if (event.keyCode == 48 && event.shiftKey) {getOperate(')'); }
}



//表达式处理
var isResult, outString = "";

function getOperate(op) {
    if (op == "←") {
        outString = outString.slice(0, outString.length - 1);
    }
    else if (op == "CE") {
        outString = "";
    }
    else if (op == "=") {
        try {
            if(outString.indexOf("//") >= 0 || outString.indexOf("/*") >= 0) {throw "error"; }
            if(outString.length != 0) {
                outString = "" + eval(outString);
            }
            isResult = true;
        }
        catch(exception) {
            alert("表达式错误！");
        }
    }
    else {
        if (isResult && op != "/" && op != "*" && op != "-" && op != "+") {
            outString = "";
        }
        isResult = false;
        outString += op;
    }
    document.getElementById("out").value = outString;
}
