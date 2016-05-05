var mongoose = require('mongoose');
var model = mongoose.Schema({
	title: String,
	url: String,
	auth: {
		_id: String,
		fullname: String,
		username: String,
		avatar: String,
		desc: String,
		social: {
			facebook: String,
			twitter: String,
			gplus: String
		}
	},
	category: {
		_id: String,
		name: String,
		url: String
	},
	desc: String,
	content: String,
	img: String,
	tags: [],
	demo: String,
	code: String,
	views: {
		type: Number,
		default: 0
	},
	create_at: {
		type: Date,
		default : Date.now()
	}
});
module.exports = mongoose.model('posts', model);