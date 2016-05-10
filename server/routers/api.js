var Post = require('../models/post'),
    Category = require('../models/category');
User = require('../models/user'),
    multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
});
module.exports = function(app) {
    app.get('/api/v1/post', function(req, res) {
        if (req.query.id) {
        	console.log(req.ip);
            return Post.findOne({
                url: req.query.id
            }, function(err, p) {
                return res.json({
                    data: [p]
                });
            });
        }
        if (req.query.search) {
            return match(req.query.search, function(result) {
                return res.json({
                    data: result
                });
            });
        }
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        if (req.query.record) {
            var record = req.query.record;
        } else {
            var record = 10;
        }
        if (req.query.category) {
            var selector = {
                'category.url': req.query.category
            };
        } else {
            var selector = {};
        }
        if (req.query.sort) {
            var s = req.query.sort.toString();
            var sorter = {
                s: -1
            };
        }
        if (req.query.tag) {
            return Post.find({
                tags: req.query.tag
            }).sort(sorter).skip(page * record - record).limit(record).exec(function(err, p) {
                return res.json({
                    data: p
                });
            });
        }
        Post.find(selector).sort(sorter).skip(page * record - record).limit(record).exec(function(err, p) {
            return res.json({
                data: p
            });
        });

        function match(taget, callback) {
            var arr = [];
            Post.find({}, function(err, p) {
                if (p.length > 0) {
                    for (var i = 0; i < p.length; i++) {
                        if (p[i].title.toLowerCase().indexOf(taget) != -1) {
                            arr.push(p[i]);
                        }
                    };
                }
                return callback(arr);
            });
        }
    });
    app.get('/api/v1/category', function(req, res) {
        if (req.query.id) {
            return Category.findOne({
                url: req.query.id
            }, function(err, c) {
                return res.json({
                    data: [c]
                });
            });
        }
        Category.find().exec(function(err, c) {
            res.json({
                data: c
            });
        });
    });
    /*admin API*/
    app.post('/api/v1/admin/post/create', upload.single('file'), function(req, res) {
    	req.body.data = JSON.parse(req.body.data);
        var url = makeUrl(req.body.data.title);
        Post.findOne({
            url: url
        }, function(err, p) {
            if (p) return res.json({
                error: 'Tên bài viết đã tồn tại!'
            });
            req.body.data.url = url;
            req.body.data.tags = req.body.data.tags.replace(/ /g, '').split(',');
            req.body.data.img = '/public/uploads/' + req.file.filename;
            req.body.data.auth = req.user._id;
            Category.findById(req.body.data.category, function(err, c) {
                req.body.data.category = {
                    _id: c._id,
                    name: c.name,
                    url: c.url
                };
                new Post(req.body.data).save(function(err, p) {
                    return res.json({
                        data: [p]
                    });
                });
            });
        });
    });

    function makeUrl(str) {
        var str = str.toString().trim().toLowerCase();
        return str.replace(/á|ạ|ả|ã|à|ă|ắ|ẳ|ặ|â|ấ|ậ|ẫ/g, 'a').replace(/é|ẹ|ẻ|è|ê|ế|ệ|ề|ể/g, 'e').replace(/ó|ọ|ỏ|ò|õ|ô|ố|ộ|ổ|ồ|ỗ|ố|ơ|ớ|ở|ờ|ợ/g, 'o').replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u').replace(/ì|í|ị|ỉ|ĩ/g, 'i').replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y').replace(/đ/g, 'd').replace(/:|( -)|'|"|,|;|<|>|\+|\(|\)/g, '').replace(/\n|\r| /g, '-');
    }
}