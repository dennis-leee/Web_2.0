var public = {
    waitTime: 5
}

function checkValidity() {    //检查合法性
    if($("#result").text()) {    //清空#result里的内容
        $("#result").text("");
    }
    
    var value = $(this).val();
    if (value == "") return;
    var objName = $(this).attr("name"), flag;
    switch(objName) {
        case "username": 
            flag = /^[a-zA-Z]\w{5,17}$/.test(value);
            break;
        case "password":
            flag = /[a-zA-Z_0-9-]{6,12}/.test(value);
            break;
        case "repeatPassword":
            flag = value == $("[name='password']").val() && /[a-zA-Z_0-9-]{6,12}/.test($("[name='password']").val());
            break;
        case "studentID":
            flag = /^[1-9]\d{7}$/.test(value);
            break;
        case "phone":
            flag = /^[1-9]\d{10}$/.test(value);
            break;
        case "email":
            flag = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(value);
            break;
    }
    showValidity(flag, objName);
}

function showValidity(flags, name) {    //显示是否合法的图标
    var icon = $("[name=" + name + "]").prev();
    icon.attr("src", flags ? "./images/correct.png" : "./images/error.png");
    icon.css("opacity", 1);
}

function isAllCorrect() {    //全部合法才能提交
    var corrcetPath = "./images/correct.png";
    var flag = true;
    $("img").each(function() {
        if($(this).attr("src") != corrcetPath) flag = false;
    });
    return flag;
}

function success(operation) {    //登录或注册操作成功后禁止用户修改信息
    $(".input input").attr("readonly", "readonly");
    $(".button input").attr("disabled", "disabled");
    countDownToJumpPage(operation);
}

function countDownToJumpPage(operation) {    //倒计时跳转页面
    if(public.waitTime-- <= 0) {
        clearTimeout(public.clock);
        window.location.href = '/?username=' + $("[name='username']").val();
        return;
    }
    $("#result").text(operation + "成功！" + public.waitTime + "秒后跳转页面");
    public.clock = setTimeout(countDownToJumpPage.bind(null, operation), 1000);
}
