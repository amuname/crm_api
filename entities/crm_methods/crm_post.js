const fetch = require('node-fetch')
const { HEADERS, URI } = require('./headers')

// fetch('https://google.com')
// .then(e=>e.text())
// .then(e=>console.log(e))


async function post () {
	console.log('this',this)
	// console.log(this.model)
	const uri = URI.concat(`${this.model.data.type}/`)
	// console.log(uri, HEADERS)
	const res = await fetch(uri, { body: JSON.stringify(this.model), headers: HEADERS, method: 'POST' })
	const json = await res.text()
	return json
}

// post().then(e=> console.log(e))

module.exports.post = post