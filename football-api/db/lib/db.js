'use strict';

const mongoose = require('mongoose');
const User = require('../models/User');


class DB {
	constructor(options) {
	}

	connect() {
		mongoose.connect('mongodb://localhost/football');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log('connected success!!')
		});
	}

	getUser(id, callback) {
		return User.findById(id, callback);
	}
}

module.exports = DB