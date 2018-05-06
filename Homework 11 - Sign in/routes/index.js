var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var User = require('../models/user.js');
var mime = require('../models/mime');

module.exports = function(app) {
    app.get('/', function(req, res) {    //登录和详情页面
        if(req.session.user) {
            var user = req.session.user;
            if(user.name == req.query.username) {
                var messages = req.session.user.messages || "";
                req.session.user.messages = "";
                return res.render('user', {name: user.name, studentID: user.studentID, phone: user.phone, email: user.email, messages: messages});
            }
            req.session.user.messages = (req.query.username) ? "只能够访问自己的数据" : "";
            return res.redirect('/?username=' + user.name);
        }
        return (req.url != "/") ? res.redirect('/') : res.render("login");
    });
    
    app.post('/', function(req, res) {    //处理登录请求
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        
        User.get(req.body.username, function(err,user) {
            if(err) {
                return res.json(err);
            }
            if(user) {
                if(user.password == password) {
                    req.session.user = user;
                    return res.json('success');
                }
                return res.json('wrongPassword');
            }
            return res.json('notFound');
        });
    });
    
    app.get('/regist', function(req, res) {    //注册页面
        return res.render("regist");
    });
    
    app.post('/regist', function(req, res) {    //处理注册请求
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        
        var newUser = new User({
            name: req.body.username,
            password: password,
            studentID: req.body.studentID,
            phone: req.body.phone,
            email: req.body.email
        });
        
        User.get(newUser.name, function (err, user) {
            if (err) {
                return res.json(err);
            }
            if (user) {
                return res.json("exited");
            }
            newUser.save(function (err, user) {
                if (err) {
                    return res.json(err);
                }
                req.session.user = user;
                return res.json("success");
            });
        });
    });
    
    app.get('/logout', function(req, res) {    //注销用户
        req.session.user = null;
        return res.redirect("/");
    });
    
    app.use(function(req, res) {    //获取css,js,img
        return res.sendFile(__dirname + '../public' + req.url);
    });
}
