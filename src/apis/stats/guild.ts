import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

module.exports = {
	type: webserver.types.get,
	path: '/stats/guild',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Check Permissions
		if (!await ctr.api.checkSession(
			ctr.header.get('accesstoken'),
			ctr.header.get('tokentype'),
			ctr.header.get('userid'),
			ctr.query.get('id')
		)) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr.bot.stat.get(`g-${ctr.query.get('id')}`, 'cmd'),
			"buttons": await ctr.bot.stat.get(`g-${ctr.query.get('id')}`, 'btn'),
			"modals": await ctr.bot.stat.get(`g-${ctr.query.get('id')}`, 'mod')
		})
	}
}