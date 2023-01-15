import * as webserver from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

export = {
	type: webserver.types.get,
	path: '/check/guild',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Check Permissions
		if (!ctr.header.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.header.get('authtoken'), ctr.query.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Get Stats
		let status = true
		await ctr['@'].client.guilds.fetch(ctr.query.get('id')).catch(() => { status = false })

		// Return Result
		return ctr.print({
			"success": status
		})
	}
}