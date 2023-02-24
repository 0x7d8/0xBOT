import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/stats/global',

	async code(ctr) {
		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr['@'].bot.stat.get(`t-all`, 'cmd'),
			"buttons": await ctr['@'].bot.stat.get(`t-all`, 'btn'),
			"modals": await ctr['@'].bot.stat.get(`t-all`, 'mod')
		})
	}
} as ctrFile<Body>