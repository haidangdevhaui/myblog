var User = require('../models/user');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    multer = require('multer'),
    hash = require('password-hash');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/members')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
});
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                error: 'Tên đăng nhập không hợp lệ!'
            });
        }
        if (!hash.verify(password, user.password)) {
            return done(null, false, {
                error: 'Mật khẩu không đúng!'
            });
        }
        return done(null, user);
    });
}));

module.exports = function(app){
    app.post('/api/v1/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({
                    data: [{
                        error: info.error
                    }]
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.json({
                    data: [user]
                });
            });
        })(req, res, next);
    });
    app.get('/api/v1/user', function(req, res){
        return res.json({
            data: [req.user]
        });
    });
    app.get('/api/v1/users', function(req, res){
        var selector = {};
        if(req.query.auth){
            var selector = {
                auth: req.query.auth
            }
        }
        User.find(selector, function(err, u){
            return res.json({data: u});
        });
    });
    app.get('/api/v1/logout', function(req, res){
        req.logout();
        return res.json({
            data: [{
                success: true
            }]
        });
    });
    app.post('/api/v1/register', upload.single('file'), function(req, res){
        req.body = JSON.parse(req.body.data);
        req.body.avatar = 'public/uploads/members/' + req.file.filename;
        req.body.password = hash.generate(req.body.password);
        User.findOne({username: req.body.username, email: req.body.email}, function(err, u){
            if(u){
                if(u.username == req.body.username){
                    return res.json({
                        data: [{
                            error: 'Tên đăng nhập đã tồn tại!'
                        }]
                    });
                }
                if(u.email == req.body.email){
                    return res.json({
                        data: [{
                            error: 'Email đã được sử dụng!'
                        }]
                    });
                }
            }
            new User(req.body).save(function(err, u){
                return res.json({
                    data: [u]
                });
            });
        });
    });
    
}