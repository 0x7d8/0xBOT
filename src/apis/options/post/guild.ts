import * as webserver from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

export = {
	type: webserver.types.post,
	path: '/options/guild',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })
		if (!('option' in ctr.reqBody) || !('value' in ctr.reqBody)) return ctr.print({ "success": false, "message": 'NO HEADERS' })
		
		// Check Permissions
		if (!ctr.header.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.header.get('authtoken'), ctr.query.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Prepare Response
		let response: any = { "success": false, "message": 'NOT FOUND' }

		// Custom
		if (ctr.reqBody.option === 'LANGUAGE') {
			if (ctr.reqBody.value !== 'GERMAN' && ctr.reqBody.value !== 'ENGLISH') return ctr.print({ "success": false, "message": 'INVALID VALUE' })
			let set = 'en'; if (ctr.reqBody.value === 'GERMAN') { set = 'de' }
			ctr['@'].bot.language.set(ctr.query.get('id'), set)
			response = { "success": true, "message": 'OPTION UPDATED' }
		}

		// Boolean
		if (ctr.reqBody.option !== 'LANGUAGE') {
			if (ctr.reqBody.value !== true && ctr.reqBody.value !== false) return ctr.print({ "success": false, "message": 'INVALID VALUE' })
			ctr['@'].bot.settings.set(ctr.query.get('id'), ctr.reqBody.option.toLowerCase(), ctr.reqBody.value)
			response = { "success": true, "message": 'OPTION UPDATED' }
		}

		// Return Result
		return ctr.print(response)
	}
}