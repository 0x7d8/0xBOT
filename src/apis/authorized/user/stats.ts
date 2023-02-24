import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/stats/user',

	async code(ctr) {
		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))

		// Return Result
		return ctr.print({
			"success": true,
			"commands": await ctr['@'].bot.stat.get(`u-${userInfos.id}`, 'cmd'),
			"buttons": await ctr['@'].bot.stat.get(`u-${userInfos.id}`, 'btn'),
			"modals": await ctr['@'].bot.stat.get(`u-${userInfos.id}`, 'mod')
		})
	}
} as ctrFile<Body>