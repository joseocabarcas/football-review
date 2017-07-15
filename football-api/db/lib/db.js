'use strict';

const mongoose = require('mongoose');
const User = require('../models/User');
mongoose.Promise = global.Promise


class DB {
	constructor(options) {
		this.connected = false
	}

	connect() {
		let promise = mongoose.connect('mongodb://localhost/football', {
			useMongoClient: true
		});
		this.connected = true;
		return promise;
	}

	getUser(id, callback) {
		return User.findById(id, callback);
	}
}

module.exports = DB