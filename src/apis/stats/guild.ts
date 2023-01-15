import * as webserver from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

export = {
	type: webserver.types.get,
	path: '/stats/guild',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Check Permissions
		if (!ctr.header.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.header.get('authtoken'), ctr.query.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr['@'].bot.stat.get(`g-${ctr.query.get('id')}`, 'cmd'),
			"buttons": await ctr['@'].bot.stat.get(`g-${ctr.query.get('id')}`, 'btn'),
			"modals": await ctr['@'].bot.stat.get(`g-${ctr.query.get('id')}`, 'mod')
		})
	}
}