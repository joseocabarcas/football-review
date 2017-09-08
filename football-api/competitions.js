const { send, json } = require('micro');
const HttpHash = require('http-hash');

const hash = HttpHash();

const fetch = require('node-fetch');
//const fetch = require('isomorphic-fetch');

require('dotenv').config();
//require('es6-promise').polyfill();

hash.set('GET /competitions', async (req, res, params) => {
	console.log(req);
	let data = {};

	try {
		data = await fetch('http://api.football-data.org/v1/competitions/', {
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': process.env.TOKEN
			}
		});
		console.log(JSON.stringify(data))
		data = await data.json();
	} catch(e) {
		throw e;
	}

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
