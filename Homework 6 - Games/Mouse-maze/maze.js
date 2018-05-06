var result = "";
var playing = "false"

window.onload = function() {
    var maze = document.getElementsByClassName("maze")[0];
    maze.addEventListener("mouseover", check);
    maze.addEventListener("mouseleave", isCheat);
}

//判断游戏状态
function check(event) {
    if(event.target.id == "start") {
        playing = "true";
        if(!document.getElementById("result")) {
            document.getElementById("show_result").id = "result";
        }
        document.getElementById("result").innerHTML = "<br />";
        this.style.cursor = "pointer";
    }
    if(playing == "true") {
        if (event.target.className == "wall") {
            result += "lose";
            gameOver(event);
        } else if (event.target.id == "end") {
            result += "win";
            gameOver(event);
        }
    }
    if(playing == "false" && event.target.id == "end") {
        result = "cheatwin";
        if(!document.getElementById("result")) {
            document.getElementById("show_result").id = "result";
        }
        gameOver(event);
    }
}

//判断是否作弊
function isCheat() {
    if(playing == "true") {
        result = "cheat";
    }
}

//游戏结束
function gameOver(event) {
    var showResult = document.getElementById("result");
    if(result == "lose" || result == "cheatlose") {
        document.getElementsByClassName("maze")[0].style.cursor = "default";
        event.target.className += " lose";
        if(result == "lose") {
            showResult.textContent = "You lose!";
        } else {
            showResult.textContent = "Not only do you cheat but you lose!";
        }
    } else if (result == "win") {
        showResult.textContent = "You win!";
    } else if (result == "cheatwin") {
        showResult.textContent = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
    }
    showResult.id = "show_result";
    event.target.addEventListener("mouseout", resetting);
}

//重置
function resetting(event) {
    event.target.removeEventListener("mouseout", resetting);
    document.getElementsByClassName("maze")[0].style.cursor = "default";
    if(result == "lose" || result == "cheatlose") {
        document.getElementsByClassName("wall lose")[0].className = "wall";
    }
    result = "";
    playing = "false";
}
