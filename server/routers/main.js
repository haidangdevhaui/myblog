var fs = require('fs');
module.exports = function(app){
    
    app.get('/admin', function(req, res, next){
        if(req.user){
            if(req.user.auth == 2 || req.user.auth == 1){
                res.render('_admin', {
                    user: req.user,
			        libs: getFiles('client')
                });
            }else{
                return res.redirect('/');
            }
        }else{
            return res.redirect('/');
        }
    });
    
    app.get('/admin/*', function(req, res, next){
        if(req.user){
            if(req.user.auth == 2 || req.user.auth == 1){
                res.render('_admin', {
                    user: req.user,
			        libs: getFiles('client')
                });
            }else{
                return res.redirect('/');
            }
        }else{
            return res.redirect('/');
        }
    });
    
	app.get('/*', function(req, res){
		res.render("_index", {
			user: req.user,
			libs: getFiles('client')
		});
	});
}

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}