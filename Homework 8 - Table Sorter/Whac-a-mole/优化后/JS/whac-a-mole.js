(function() {
    var playing = false;
    var moleAlive = false;
    var time = 30;
    var score = 0;
    var clock;

    $(function() {    //主体结构
        creatHole();
        $("#startOrStop").click(startOrStop).click(creatMole);
        $(".hole").each(function() {
                $(this).click(ifHitMole);
            });
    });
    
    function creatHole() {    //生成地图
        var game = $("#game");
        _.times(60, function() {
            game.append("<div class='hole'></div>");
        });
    }

    function startOrStop() {    //开始或结束游戏
        if(playing) {
            gameOver();
            return;
        }
        playing = true;
        timeCount();
        $("#state").val("Playing");
        $("#score").val(0);
    }
    
    function creatMole() {    //生成地鼠
        if (!moleAlive) {
            $(".hole").eq(_.random(0, 59)).attr("class", "mole");
            moleAlive = true;
        }
    }

    function ifHitMole() {    //判断是否打中地鼠
        if(playing) {
            var mole = $(".mole");
            if($(this).attr("class") == mole.attr("class")) {
                mole.attr("class", "hole");
                moleAlive = false;
                creatMole();
                score += 2;
            }
            $("#score").val(--score);
        }
    }

    function timeCount() {    //计时
        if(playing) {
            $("#time").val(time);
            if(time-- == 0) {
                gameOver();
                return;
            }
            clock = setTimeout(timeCount, 1000);
        }
    }

    function gameOver() {    //游戏结束
        $("#state").val("Game Over");
        $(".mole").attr("class", "hole");
        alert("Game Over,\nYour score is: " + score);
        reSettingData();
    }

    function reSettingData() {    //重置各参数
        playing = false;
        moleAlive = false;
        clearTimeout(clock);
        time = 30;
        score = 0;
    }
})();
