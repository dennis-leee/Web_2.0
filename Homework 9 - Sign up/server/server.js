var start = function() {
    var http = require('http');
    var fs = require('fs');
    var url = require('url');
    var path = require('path');
    var util = require('util');
    var querystring = require('querystring');
    var databasePath = "./server/database.json";
    var post = "";
    var mime = {
        "html" : "text/html",
        "css"  : "text/css",
        "js"   : "text/javascript",
        "json" : "application/json",
        "png"  : "image/png",
    }
    
    http.createServer(function(request, response) {
        console.log(request.url);
        var exist = false;
        var user = querystring.parse(url.parse(request.url).query)["username"] || "";
        if(user != "") exist = checkThisUser(user, request, response);
        if(!exist && url.parse(request.url).query != "submit") createSigninPage(request, response);
        if(url.parse(request.url).query == "submit") {
            request.on('data', function(data) {    //获取表单内容
                post = querystring.parse(decodeURIComponent(data));
                if(post) saveAndShow(post, response);
            });
        }
    }).listen(8000, 'localhost');
    
    console.log("Server runing at port: 8000");
    
    function createSigninPage(request, response) {    //将初始页发送给客户端
        var filePath = (url.parse(request.url).pathname == "/") ? "./assets/index.html" : "./assets" + url.parse(request.url).pathname;
     
        fs.exists(filePath,function(exists){
            if(!exists){
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end("This request URL " + filePath + " was not found on this server.");
            } else {
                var ext = path.extname(filePath);
                ext = ext ? ext.slice(1) : 'unknown';
                var contentType = mime[ext] || "text/plain";
                var flag = (ext == "png") ? "binary" : "utf-8";
                fs.readFile(filePath, flag, function(error,data){
                    if(error){
                        response.writeHead(500, {'Content-Type': 'text/plain'});
                        response.end(error.toString());
                    }else{
                        response.writeHead(200,{'Content-Type': contentType});
                        response.end(data, flag);
                    }
                });
            }
        });
    }
    
    function saveAndShow(post, response) {    //检测唯一性以判断是否存入数据库，并将判断结果返回给客户端
        var data = JSON.parse(fs.readFileSync(databasePath));
        var repeat = {
            "mail" : false,
            "studentID" : false,
            "phone" : false,
            "mail" : false
        }
        var result = "";
        var userNumber = data.user.length;
        for(var i = 0; i < userNumber; i++) {
            repeat.username = (data.user[i].username == post.username) ? true : repeat.username;
            repeat.studentID = (data.user[i].studentID == post.studentID) ? true : repeat.studentID;
            repeat.phone = (data.user[i].phone == post.phone) ? true : repeat.phone;
            repeat.mail = (data.user[i].mail == post.mail) ? true : repeat.mail;
        }
        result += repeat.username ? "该用户名已被注册！" : "";
        result += repeat.studentID ? "该学号已被注册！" : "";
        result += repeat.phone ? "该电话已被注册！" : "";
        result += repeat.mail ? "该邮箱已被注册！" : "";
        if(!result) {
            data.user.push(post);
            fs.writeFileSync(databasePath, JSON.stringify(data));
            result += "注册成功！";
        }
        response.writeHead(200, {"Content-Type": "text/plain"})
        response.end(result);
    }
    
    function checkThisUser(name, request, response) {    //在数据库中查询是否有该用户
        var data = JSON.parse(fs.readFileSync(databasePath));
        var length = data.user.length;
        for(var i = 0; i < length; i++) {
            if(data.user[i].username == name) {
                createDetailsPage(data.user[i], request, response);
                return true;
            }
        }
        return false;
    }
    
    function createDetailsPage(post, request, response) {    //生成详情页等待跳转
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write("<!DOCTYPE HTML><html><head><title>Signin</title><meta charset='utf-8'/><style>body {font-family: Arial, Helvetica, sans-serif;} [name='signin'] {margin: auto;width: 300px;height: auto;}</style></head><body><form name='signin'><fieldset><legend>用户详情</legend>");
        response.write("<p>用户名： " + post.username + "</p>");
        response.write("<p>学号： " + post.studentID + "</p>");
        response.write("<p>电话： " + post.phone + "</p>");
        response.write("<p>邮箱： " + post.mail + "</p>");
        response.write("</fieldset></form></body></html>");
        response.end();
    }
}

exports.start = start; 
