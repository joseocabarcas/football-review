const { send, json } = require('micro');
const HttpHash = require('http-hash');
const DB = require('./db');

const hash = HttpHash()
const db = new DB()

hash.set('POST /register', async function register (req, res, params) {
	const data = {'data': 'message'}
	const statusCode = 200

    try{
        var user = await json(req)
        console.log(user)
        await db.connect()
        var response = await db.saveUser(user)
        console.log(response)
    } catch(e) {
        console.log(e)
        throw e;
    }

	send(res, statusCode, data)
})

module.exports = async function main (req, res) {
    let { method, url } = req
    let match = hash.get(`${method.toUpperCase()} ${url}`)

    if (match.handler) {
        try {
            await match.handler(req, res, match.params)
        } catch (e) {
            send(res, 500, { error: e.message })
        }
    } else {
        send(res, 404, { error: 'route not found' })
    }
}
