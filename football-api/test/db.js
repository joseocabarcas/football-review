const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');
const fixtures = require('../db/fixtures');
const DB = require('../db');

test.beforeEach('connect db', async t => {
	const db = new DB()
	let p = await db.connect()
	t.context.db = p
	t.true(db.connected)
})

test('save user', async t => {
	console.log(t.context.db)
	t.true(true)
})