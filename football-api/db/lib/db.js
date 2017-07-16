'use strict';

const mongoose = require('mongoose');
const User = require('../models/User');
const utils = require('./utils');
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

	disconnect() {
		mongoose.connection.db.dropDatabase();
		let close = mongoose.connection.close();
		this.connected = false;
		return close;
	}

	getUser(id, callback) {
		return User.findById(id, callback);
	}

	async saveUser(user) {
		user.password = await utils.encrypt(user.password)
		let _user = new User(user)
		return _user.save()
	}
}

module.exports = DB
