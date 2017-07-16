'use strict'

const bcrypt = require('bcrypt')
const saltRounds = 10;

function encrypt(password) {
	let pass = bcrypt.hash(password, saltRounds)
	return pass
}

function comparePass(password, hash) {
	let compare = bcrypt.compare(password, hash)
	return compare
}

const utils = {
	encrypt,
	comparePass
}

module.exports = utils