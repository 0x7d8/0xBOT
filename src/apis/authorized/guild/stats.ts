import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/stats/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.status(422).print({ "success": false, "message": 'NO ID' })

		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'cmd'),
			"buttons": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'btn'),
			"modals": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'mod')
		})
	}
} as ctrFile<Body>