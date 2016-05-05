var mongoose = require('mongoose');
var model = mongoose.Schema({
	name: String,
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
	icon: String,
	background: {
		"default" : String,
		hover: String
	},
	color: {
		"default" : String,
		hover: String
	},
	create_at: {
		type: Date,
		default : Date.now()
	}
});
module.exports = mongoose.model('categories', model);