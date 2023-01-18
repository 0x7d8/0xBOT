import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/fetch/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Check Permissions
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.headers.get('authtoken'), ctr.queries.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		let cont = true

		// Fetch Guild
		let guild = await ctr['@'].client.guilds.fetch(ctr.queries.get('id')).catch(() => {
			cont = false
			return ctr.print({ "success": false, "message": 'INVALID GUILD' })
		}); (guild as any).success = true

		// Return Result
		if (cont) return ctr.print(guild)
	}
} as ctrFile<Body>