const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');

test('/register', async t => {
	t.deepEqual('hi', 'hi')
})