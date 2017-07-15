const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');

const DB = require('../db');

test('connect db', async t => {
	const db = new DB()
	let p = await db.connect()
	t.deepEqual('hi', 'hi')
})