import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/stats/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Check Permissions
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.headers.get('authtoken'), ctr.queries.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'cmd'),
			"buttons": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'btn'),
			"modals": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'mod')
		})
	}
} as ctrFile<Body>