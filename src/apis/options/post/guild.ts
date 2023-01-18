import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {
	option?: string
	value?: string | boolean
}

export = {
	method: webserver.types.post,
	path: '/options/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })
		if (!('option' in ctr.body) || !('value' in ctr.body)) return ctr.print({ "success": false, "message": 'NO HEADERS' })
		
		// Check Permissions
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.headers.get('authtoken'), ctr.queries.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Prepare Response
		let response: any = { "success": false, "message": 'NOT FOUND' }

		// Custom
		if (ctr.body.option === 'LANGUAGE') {
			if (ctr.body.value !== 'GERMAN' && ctr.body.value !== 'ENGLISH') return ctr.print({ "success": false, "message": 'INVALID VALUE' })
			let set = 'en'; if (ctr.body.value === 'GERMAN') { set = 'de' }
			ctr['@'].bot.language.set(ctr.queries.get('id'), set)
			response = { "success": true, "message": 'OPTION UPDATED' }
		}

		// Boolean
		if (ctr.body.option !== 'LANGUAGE') {
			if (ctr.body.value !== true && ctr.body.value !== false) return ctr.print({ "success": false, "message": 'INVALID VALUE' })
			ctr['@'].bot.settings.set(ctr.queries.get('id'), ctr.body.option.toLowerCase(), ctr.body.value)
			response = { "success": true, "message": 'OPTION UPDATED' }
		}

		// Return Result
		return ctr.print(response)
	}
} as ctrFile<Body>