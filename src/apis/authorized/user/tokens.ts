import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/auth/tokens',

	async code(ctr) {
		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))

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