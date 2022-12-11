import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

module.exports = {
	type: webserver.types.get,
	path: '/stats/user',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr.bot.stat.get(`u-${ctr.query.get('id')}`, 'cmd'),
			"buttons": await ctr.bot.stat.get(`u-${ctr.query.get('id')}`, 'btn'),
			"modals": await ctr.bot.stat.get(`u-${ctr.query.get('id')}`, 'mod')
		})
	}
}