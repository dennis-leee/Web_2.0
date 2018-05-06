(function() {
    $(function() {
        $(".input input").blur(checkValidity)
                         .blur();
        $("[name='regist']").submit(submitForm);
        $("[type='reset']").click(clear);
    });
    
    function clear() {
        $("img").each(function() {
            $(this).css("opacity", 0);
        });
        $("#result").text("");
    }
    
    function submitForm() {
        if(!isAllCorrect()) {    //不合要求则阻止提交
            $("#result").text("存在非法格式！");
            return false;
        }
        
        $.ajax({    //采用ajax提交
            type: "POST",
            async: true,
            data: $("[name='regist']").serialize(),
            dataType: "json",
            url: "/regist",
            success: function(result) {
                switch(result) {
                    case "success": success("注册");
                                    break;
                    case "exited": $("#result").text("该用户已存在！");
                                   showValidity(false, "username");
                                   break;
                    default: window.location.href = "/";
                }
            }
        });
        
        return false; //阻止submit提交
    }
})();
