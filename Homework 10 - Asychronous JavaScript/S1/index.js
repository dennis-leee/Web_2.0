(function() {
    var currentAjax = null;
    $(function() {
        $(".num").hide();
        $("button:not('#sum')").click(getNumber);
        disabledButton($("#sum"));
        $("#sum").click(getResult)
        $(".icon").mouseover(clearData);
    });
    
    function disabledButton(button) {
        button.attr("disabled", "disabled")
              .css("background-color", "rgba(104, 104, 104, 1)");
    }
    
    function enabledButton(button) {
        button.removeAttr("disabled")
              .css("background-color", "rgba(48, 63, 159, 1)");
    }
    
    function getNumber() {
        var thisButton = $(this);
        var numberSpan = thisButton.children(":last");
        numberSpan.text("...").show();
        var otherUnclickButtons = $(".num:empty").parent();
        currentAjax = $.ajax({
            url: "/",
            async: true,
            type: "get",
            beforeSend: function() {
                disabledButton(otherUnclickButtons);
            },
            success: function(num){
                        numberSpan.text(num);
                        enabledButton(otherUnclickButtons);
                        disabledButton(thisButton);
                        if(isGetAllNumber()) {
                            enabledButton($("#sum"));
                        }
                    }
        });
    }
    
    function getResult() {
        var result = 0;
        $(".num").each(function() {
            result += parseInt($(this).text());
        });
        $(".result").text(result);
        disabledButton($("#sum"));
    }
    
    function isGetAllNumber() {
        var flag = true;
        $(".num").each(function() {
            if($(this).text() == "" || $(this).text() == "...") {
                flag = false;
            }
        });
        return flag;
    }

    function clearData() {
        if(currentAjax) currentAjax.abort();
        $("span").text("");
        $(".num").hide();
        disabledButton($("#sum"));
        enabledButton($("button:not('#sum')"));
    }
})();