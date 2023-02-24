import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/check/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.status(422).print({ "success": false, "message": 'NO ID' })

		// Get Stats
		let status = true
		await ctr['@'].client.guilds.fetch(ctr.queries.get('id')).catch(() => { status = false })

		// Return Result
		return ctr.print({
			"success": status
		})
	}
} as ctrFile<Body>