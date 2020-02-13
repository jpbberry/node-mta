const fetch = require('node-fetch')
const querystring = require('querystring')

function request(url, headers, opts = {}, ...req) {
	return new Promise((resolve, reject) => {
		const [ method, route, { query, body }, end ] = req
		end()
	
		fetch(`${url}${route}${ query || opts.query ? `?${querystring.stringify({
			...query, ...opts.query || {}
		})}` : ""}`, {
			method,
			headers: {
				'Content-Type': opts.contentType ? opts.contentType : 'application/json',
				...headers
			},
			body: body ? JSON.stringify(body) : null
		})
		.then(res => {
			return res[opts.format || "json"]()
		})
		.then(parsed => {
			resolve(parsed)
		})
	})
}

module.exports = request