var mongoose = require('mongoose');
var model = mongoose.Schema({
	fullname: String,
	birth: Date,
	province: String,
	gender: Number,
	auth: {
		type: Number,
		default: 0
	},
	email: String,
	phone: String,
	username: String,
	password: String,
	avatar: String,
	create_at: {
		type: Date,
		default : Date.now()
	}
});
module.exports = mongoose.model('users', model);