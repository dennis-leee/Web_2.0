(function() {
    $(function() {
        $(".input input").blur(checkValidity)
                         .blur();
        $("[name='login']").submit(submitForm);
        $("[name='regist']").click(jumpToRegist);
    });
    
    function jumpToRegist() {
        window.location.href = "/regist";
    }

    function submitForm() {
        if(!isAllCorrect()) {    //不合要求则阻止提交
            $("#result").text("存在非法格式！");
            return false;
        }
        
        $.ajax({    //采用ajax提交
            type: "POST",
            async: true,
            data: $("[name='login']").serialize(),
            cache: false,
            url: "/",
            success: function(result) {
                $(".messages").text("");
                switch(result) {
                    case "success": success("登录");
                        break;
                    case "notFound": $(".messages").eq(0).text("该用户不存在！");
                        showValidity(false, "username");
                        break;
                    case "wrongPassword": $(".messages").eq(1).text("密码错误！");
                        showValidity(false, "password");
                        break;
                    default: window.location.href = "/";
                }
            }
        });
        
        return false; //阻止submit提交
    } 
})();
