import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/auth/tokens',

	async code(ctr) {
		// Check for Headers
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })

		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))
		if (!userInfos.id) return ctr.print({ "success": false, "message": 'USER NOT FOUND' })

		// Return Result
		return ctr.print({
			"success": true,
			"tokens": {
				"access": userInfos.tokens.access,
				"refresh": userInfos.tokens.refresh
			}
		})
	}
} as ctrFile<Body>