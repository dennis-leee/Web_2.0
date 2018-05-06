(function() {
    var queue = [];
    var currentAjax = null;
    $(function() {
        $(".num").hide();
        disabledButton($("#sum"));
        $("#sum").click(getResult);
        $(".icon").click(start);
        $("#button").mouseout(clearData);
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
                        clickNext(thisButton.attr("id"));
                    }
        });
    }
    
    function clickNext(oldButton) {
        switch (oldButton) {
            case queue[0] : $("#" + queue[1]).click();
                            break;
            case queue[1] : $("#" + queue[2]).click();
                            break;
            case queue[2] : $("#" + queue[3]).click();
                            break;
            case queue[3] : $("#" + queue[4]).click();
                            break;
            case queue[4] : $("#sum").click();
                            break;
        }
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
    
    function start() {
        $("button:not('#sum')").click(getNumber);
        queue = getRandomQueue();
        $(".queue").text(queue.join("→"));
        $("#" + queue[0]).click();
    }
    
    function getRandomQueue() {
        var randomQueue = ["A", "B", "C", "D", "E"];
        var temp;
        for(var i = 0; i < 4; i++) {
            if(Math.random() - 0.5 >= 0) {
                temp = randomQueue[i];
                randomQueue[i] = randomQueue[i + 1];
                randomQueue[i + 1] = temp;
            }
        }
        return randomQueue;
    }
    
    function clearData() {
        queue = [];
        if(currentAjax) currentAjax.abort();
        $("span").text("");
        $(".num").hide();
        disabledButton($("#sum"));
        enabledButton($("button:not('#sum')"));
    }
})();