(function() {
    
    $(function() {
        $(".num").hide();    
        $("#sum").attr("disabled", "disabled")
                      .css("background-color", "rgba(104, 104, 104, 1)");
        $(".icon").click(start);
    });
    
    function aHandler(event) {
        var args = event.data;
        var thisButton = $(this);
        var otherUnclickButtons = $(".num:empty").parent();
        var numberSpan = thisButton.children(":last");
        var req = $.ajax({
            url: "/",
            async: true,
            type: "get",
            beforeSend: function() {
                otherUnclickButtons.attr("disabled", "disabled");
                otherUnclickButtons.css("background-color", "rgba(104, 104, 104, 1)");
                numberSpan.text("...").show();
            },
            success: function(num){
                        args.message = "这是个天大的秘密";
                        $(".message").text(args.message);
                        
                        args.currentSum += parseInt(num);
                        numberSpan.text(num);
                        otherUnclickButtons.removeAttr("disabled")
                                           .css("background-color", "rgba(48, 63, 159, 1)");
                        thisButton.attr("disabled", "disabled")
                                  .css("background-color", "rgba(104, 104, 104, 1)");
                        if(isGetAllNumber()) {
                            $("#sum").removeAttr("disabled")
                                          .css("background-color", "rgba(48, 63, 159, 1)");
                        }
                        if(args.currentHandlerNumber++ <= 3) {
                            $("#" + args.queue[args.currentHandlerNumber]).bind("click", args, args[args.queue[args.currentHandlerNumber]]);
                            $("#" + args.queue[args.currentHandlerNumber]).click();
                        } else {
                            $("#sum").bind("click", args, showResult);
                            $("#sum").click();
                        }
                    }
        });
    }
    
    function bHandler(event) {
        var args = event.data;
        var thisButton = $(this);
        var otherUnclickButtons = $(".num:empty").parent();
        var numberSpan = thisButton.children(":last");
        var req = $.ajax({
            url: "/",
            async: true,
            type: "get",
            beforeSend: function() {
                otherUnclickButtons.attr("disabled", "disabled");
                otherUnclickButtons.css("background-color", "rgba(104, 104, 104, 1)");
                numberSpan.text("...").show();
            },
            success: function(num){
                        args.message = "我不知道";
                        $(".message").text(args.message);
                        args.currentSum += parseInt(num);
                        numberSpan.text(num);
                        otherUnclickButtons.removeAttr("disabled")
                                           .css("background-color", "rgba(48, 63, 159, 1)");
                        thisButton.attr("disabled", "disabled")
                                  .css("background-color", "rgba(104, 104, 104, 1)");
                        if(isGetAllNumber()) {
                            $("#sum").removeAttr("disabled")
                                          .css("background-color", "rgba(48, 63, 159, 1)");
                        }
                        if(args.currentHandlerNumber++ <= 3) {
                            $("#" + args.queue[args.currentHandlerNumber]).bind("click", args, args[args.queue[args.currentHandlerNumber]]);
                            $("#" + args.queue[args.currentHandlerNumber]).click();
                        } else {
                            $("#sum").bind("click", args, showResult);
                            $("#sum").click();
                        }
                    }
        });
    }
    
    function cHandler(event) {
        var args = event.data;
        var thisButton = $(this);
        var otherUnclickButtons = $(".num:empty").parent();
        var numberSpan = thisButton.children(":last");
        var req = $.ajax({
            url: "/",
            async: true,
            type: "get",
            beforeSend: function() {
                otherUnclickButtons.attr("disabled", "disabled");
                otherUnclickButtons.css("background-color", "rgba(104, 104, 104, 1)");
                numberSpan.text("...").show();
            },
            success: function(num){
                        args.message = "你不知道";
                        $(".message").text(args.message);
                        args.currentSum += parseInt(num);
                        numberSpan.text(num);
                        otherUnclickButtons.removeAttr("disabled")
                                           .css("background-color", "rgba(48, 63, 159, 1)");
                        thisButton.attr("disabled", "disabled")
                                  .css("background-color", "rgba(104, 104, 104, 1)");
                        if(isGetAllNumber()) {
                            $("#sum").removeAttr("disabled")
                                          .css("background-color", "rgba(48, 63, 159, 1)");
                        }
                        if(args.currentHandlerNumber++ <= 3) {
                            $("#" + args.queue[args.currentHandlerNumber]).bind("click", args, args[args.queue[args.currentHandlerNumber]]);
                            $("#" + args.queue[args.currentHandlerNumber]).click();
                        } else {
                            $("#sum").bind("click", args, showResult);
                            $("#sum").click();
                        }
                    }
        });
    }
    
    function dHandler(event) {
        var args = event.data;
        var thisButton = $(this);
        var otherUnclickButtons = $(".num:empty").parent();
        var numberSpan = thisButton.children(":last");
        var req = $.ajax({
            url: "/",
            async: true,
            type: "get",
            beforeSend: function() {
                otherUnclickButtons.attr("disabled", "disabled");
                otherUnclickButtons.css("background-color", "rgba(104, 104, 104, 1)");
                numberSpan.text("...").show();
            },
            success: function(num){
                        args.message = "他不知道";
                        $(".message").text(args.message);
                        args.currentSum += parseInt(num);
                        numberSpan.text(num);
                        otherUnclickButtons.removeAttr("disabled")
                                           .css("background-color", "rgba(48, 63, 159, 1)");
                        thisButton.attr("disabled", "disabled")
                                  .css("background-color", "rgba(104, 104, 104, 1)");
                        if(isGetAllNumber()) {
                            $("#sum").removeAttr("disabled")
                                          .css("background-color", "rgba(48, 63, 159, 1)");
                        }
                        if(args.currentHandlerNumber++ <= 3) {
                            $("#" + args.queue[args.currentHandlerNumber]).bind("click", args, args[args.queue[args.currentHandlerNumber]]);
                            $("#" + args.queue[args.currentHandlerNumber]).click();
                        } else {
                            $("#sum").bind("click", args, showResult);
                            $("#sum").click();
                        }
                    }
        });
    }
    
    function eHandler(event) {
        var args = event.data;
        var thisButton = $(this);
        var otherUnclickButtons = $(".num:empty").parent();
        var numberSpan = thisButton.children(":last");
        var req = $.ajax({
            url: "/",
            async: true,
            type: "get",
            beforeSend: function() {
                otherUnclickButtons.attr("disabled", "disabled");
                otherUnclickButtons.css("background-color", "rgba(104, 104, 104, 1)");
                numberSpan.text("...").show();
            },
            success: function(num){
                        args.message = "才怪";
                        $(".message").text(args.message);
                        args.currentSum += parseInt(num);
                        numberSpan.text(num);
                        otherUnclickButtons.removeAttr("disabled")
                                           .css("background-color", "rgba(48, 63, 159, 1)");
                        thisButton.attr("disabled", "disabled")
                                  .css("background-color", "rgba(104, 104, 104, 1)");
                        if(isGetAllNumber()) {
                            $("#sum").removeAttr("disabled")
                                          .css("background-color", "rgba(48, 63, 159, 1)");
                        }
                        if(args.currentHandlerNumber++ <= 3) {
                            $("#" + args.queue[args.currentHandlerNumber]).bind("click", args, args[args.queue[args.currentHandlerNumber]]);
                            $("#" + args.queue[args.currentHandlerNumber]).click();
                        } else {
                            $("#sum").bind("click", args, showResult);
                            $("#sum").click();
                        }
                    }
        });
    }
    
    function showResult(event) {
        var args = event.data;
        args.message = "楼主异步调用战斗力感人，目测不超过" + args.currentSum;
        $(".message").text(args.message);
        $(".result").text(args.message);
        $("#sum").attr("disabled", "disabled")
                      .css("background-color", "rgba(104, 104, 104, 1)");
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
        var queue = getRandomQueue();
        var data = {
            queue: queue,
            currentSum: 0,
            currentHandlerNumber: 0,
            message: "",
            "A": aHandler,
            "B": bHandler,
            "C": cHandler,
            "D": dHandler,
            "E": eHandler,
        }
        $("#button").bind("mouseout", data, clearData);
        $(".queue").text(queue.join("→"));
        $("#" + queue[0]).bind("click", data, data[queue[0]]);
        $("#" + queue[0]).click();
    }
    
    function clearData(event) {
        $("span").text("");
        $(".num").hide();
        $("#sum").attr("disabled", "disabled")
                      .css("background-color", "rgba(104, 104, 104, 1)");
        $("button:not('#sum')").removeAttr("disabled")
                                    .css("background-color", "rgba(48, 63, 159, 1)");
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
    
})();