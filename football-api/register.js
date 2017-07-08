const { send, json } = require('micro');
const HttpHash = require('http-hash');

const hash = HttpHash()

hash.set('GET /register', async function register (req, res, params) {
	const data = {'data': 'message'}
	const statusCode = 200

	console.log(data)

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