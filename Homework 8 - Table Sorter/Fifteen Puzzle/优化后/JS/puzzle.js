(function() {
    var playing = false;
    var ready = false;
    var blank = 15;
    var count = 0;
    var time = 0;
    var clock;
    
    $(function() {    //主体初始化
        creatPuzzleArea();
        initializeTiles();
        $("#start").click(startOrStop).click(timeCount);
        $("#resetting").click(scrambleTiles);
    });

    function creatPuzzleArea() {    //生成拼图区域
        var game = $("#game");
        game.delegate("div", "click", ifCanMove);
        _.times(16, function() {
            game.append("<div></div>");
        });
    }
    
    function initializeTiles() {    //初始化拼图
        var blockList = $("#game div");
        blockList.each(function(i) {
            $(this).addClass("puzzle_pieces correct_position_" + i).attr("id", "current_position_" + i);
        });
        blockList.eq(15).attr("class", "blank");
    }

    function scrambleTiles() {    //打乱拼图
        if(playing) {return;}
        initializeTiles();
        _.times(100, function() {
            var positionToBeMove = [];
            (!isInEdgeArea(blank, "right")) ? positionToBeMove.push(blank + 1) : null;
            (!isInEdgeArea(blank, "left")) ? positionToBeMove.push(blank - 1) : null;
            (!isInEdgeArea(blank, "top")) ? positionToBeMove.push(blank - 4) : null;
            (!isInEdgeArea(blank, "bottom")) ? positionToBeMove.push(blank + 4) : null;
            var random = _.random(0, positionToBeMove.length - 1);
            swap(blank, positionToBeMove[random]);
            blank = positionToBeMove[random];
        });
        ready = true;
    }
    
    edgePositions = {    //边缘位置
        "top" : [0, 1, 2, 3],
        "bottom" : [12, 13, 14, 15],
        "left" : [0, 4, 8, 12],
        "right" : [3, 7, 11, 15]
    }
    
    function isInEdgeArea(block, direction) {    //判断指定块是否处于边缘区域
        var edgePosition = edgePositions[direction];
        return (block == edgePosition[0] || block == edgePosition[1] || block == edgePosition[2] || block == edgePosition[3]);
    }

    function startOrStop() {    //判断开始还是结束游戏
        (playing) ? stop() : start();
        $("#time").val("0s");
        $("#steps").val("0");
    }
    
    function start() {    //开始游戏
        $("#start").text("Stop Game");
        $("#state").val("Playing");
        (!ready) ? scrambleTiles() : null;
        playing = true;
    }
    
    function stop() {    //结束游戏
        initializeTiles();
        clearData();
        $("#state").val("Waiting");
    }
    
    function timeCount() {    //时钟
        if(playing) {
            $("#time").val(++time + "s");
            clock = setTimeout(timeCount, 1000);
        }
    }

    function ifCanMove() {    //判断能否移动指定方块
        if(playing) {
            var currentPosition = getcurrentPosition($(this));
            if(((!isInEdgeArea(currentPosition, "right")) && currentPosition + 1 == blank) || ((!isInEdgeArea(currentPosition, "left")) && currentPosition - 1 == blank) || ((!isInEdgeArea(currentPosition, "top")) && currentPosition - 4 == blank) || ((!isInEdgeArea(currentPosition, "bottom")) && currentPosition + 4 == blank )) {
                swap(currentPosition, blank);
                blank = currentPosition;
                $("#steps").val(++count);
            }
        }
    }
    
    function getcurrentPosition(block) {    //获取指定图块的当前位置
        var num_pos = block.attr("id").search("n_") + 2;
        var currentPosition = parseInt(block.attr("id").slice(num_pos));
        return currentPosition;
    }

    function swap(currentBlock, anotherBlock) {    //交换方块
        var blockA = $("#current_position_" + currentBlock);
        var blockB = $("#current_position_" + anotherBlock);
        blockA.attr("id", "current_position_" + anotherBlock);
        anotherBlock = currentBlock;
        blockB.attr("id", "current_position_" + anotherBlock);
        (playing) ? isAllCorrectPosition() : null;
    }

    function isAllCorrectPosition() {    //判断拼图全部处于正确位置
        var allCorrect = true;
        var puzzleList = $(".puzzle_pieces");
        puzzleList.each(function(i) {
            (getcurrentPosition($(this)) != i) ? allCorrect = false : null;
        })
        ifWin(allCorrect);
    }
    
    function ifWin(state) {    //判断游戏是否获胜
        if(state) {
            $("#state").val("You win!");
            clearData();
        }
    }
    
    function clearData() {    //重置各参数
        $("#start").text("Start Game");
        clearTimeout(clock);
        playing = false;
        ready = false;
        blank = 15;
        count = 0;
        time = 0;
    }
})();
