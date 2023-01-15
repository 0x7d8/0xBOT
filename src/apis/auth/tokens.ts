import * as webserver from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

export = {
	type: webserver.types.get,
	path: '/auth/tokens',

	async code(ctr: webserverInterface) {
		// Check for Headers
		if (!ctr.header.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })

		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.header.get('authtoken'))
		if (userInfos === 'N-FOUND') return ctr.print({ "success": false, "message": 'USER NOT FOUND' })

		// Return Result
		return ctr.print({
			"success": true,
			"tokens": {
				"access": userInfos.tokens.access,
				"refresh": userInfos.tokens.refresh
			}
		})
	}
}