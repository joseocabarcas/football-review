const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');
const fixtures = require('../db/fixtures');
const DB = require('../db');
const utils = require('../db/lib/utils');

test.beforeEach('connect db', async t => {
	const db = new DB()
	await db.connect()
	t.context.db = db
	t.true(db.connected)
})

test.afterEach.always('cleanup database', async t => {
  let db = t.context.db

  await db.disconnect()
  t.false(db.connected, 'should be disconnected')
})

test('save user', async t => {
	let db = t.context.db
	t.is(typeof db.saveUser, 'function', 'saveUser is a function')

	let user = fixtures.getUser()
	let passPlain = user.password
	let created = await db.saveUser(user)

	let passMatch = await utils.comparePass(passPlain, created.password)

	t.is(user.username, created.username)
	t.is(user.email, created.email)
	t.is(user.name, created.name)
	t.true(passMatch)
	t.is(typeof created._id, 'object')
	t.truthy(created.created_at)
})
