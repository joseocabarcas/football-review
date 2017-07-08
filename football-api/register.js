const { send, json } = require('micro')

module.exports = async (req, res) => {
	const data = await json(req)
	const statusCode = 200

	console.log(data)

	send(res, statusCode, data)
}