const { send, json } = require('micro');
const HttpHash = require('http-hash');

const hash = HttpHash();

hash.set('GET /competitions', async (req, res, params) => {
	console.log(req);
	const data = {}
	send(res, 200, data);
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
