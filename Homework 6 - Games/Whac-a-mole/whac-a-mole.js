var start = false;
var pause = false;
var moleAlive = false;
var time = 30;
var score = 0;
var clock;


window.onload = function (event) {
    document.getElementById("score").setAttribute("readonly", "readonly");
    document.getElementById("time").setAttribute("readonly", "readonly");
    document.getElementById("state").setAttribute("readonly", "readonly");
    var button = document.getElementById("button");
    button.addEventListener("click", startGameOrStopGame);
    button.addEventListener("click", creatMole);
    var game = document.getElementById("game");
    for(var num = 0; num < 60; num++) {
        var mole = document.createElement("div");
        mole.className = "hole";
        game.appendChild(mole);
    }
}

//开始或结束游戏
function startGameOrStopGame(event) {
    if (!start) {
        start = true;
        time = 30;
        var gameEvent = document.getElementsByClassName("hole");
        for(var num = 0; num < 60; num++) {
            gameEvent[num].addEventListener("click", check);
        }
        document.getElementById("score").value = "0";
        document.getElementById("state").value = "Playing";
        timeCount();
    } else if(pause){
        pause = false;
        timeCount();
        document.getElementById("state").value = "Playing";
    } else {
        pause = true;
        document.getElementById("state").value = "Pausing";
    }
}

//生成地鼠
function creatMole(event) {
    if (!moleAlive) {
        var num = Math.floor(Math.random() * 60);
        var mole = document.getElementsByClassName("hole");
        mole[num].className = "mole";
        moleAlive = true;
    }
}

//判断是否打中
function check(event) {
    if(!pause) {
        var mole = document.getElementsByClassName("mole")[0];
        var whac = event.target.className;
        if(whac == mole.className) {
            score++;
            mole.className = "hole";
            moleAlive = false;
            creatMole();
        } else {
            score--;
        }
    }
    document.getElementById("score").value = score;
}

//计时
function timeCount() {
    document.getElementById("time").value = time;
    if(!pause) {
        if(time == 0) {
            gameOver();
            return;
        }
        time -= 1;
        clock = setTimeout("timeCount()", 1000);
    }
}

//游戏结束
function gameOver() {
    start = false;
    moleAlive = false;
    pasue = false;
    clearTimeout(clock);
    document.getElementsByClassName("mole")[0].className = "hole";
    document.getElementById("state").value = "Game Over";
    alert("Game Over,\nYour score is: " + score);
}
