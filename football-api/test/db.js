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
	let db = t.context.db
	t.is(typeof db.saveUser, 'function', 'saveUser is a function')

	let user = fixtures.getUser()
	let passPlain = user.password
	let created = await db.saveUser(user)

	t.is(user.username, created.username)
	t.is(user.email, created.email)
	t.is(user.name, created.name)
	t.is(utils.encrypt(plainPassword), created.password)
	t.is(typeof user.id, 'string')
	t.truthy(created.createdAt)
	t.true(true)
})