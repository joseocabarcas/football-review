const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');

const DB = require('../db');
const db = new DB()

test('get user', async t => {
	db.connect()
	t.deepEqual('hi', 'hi')
})