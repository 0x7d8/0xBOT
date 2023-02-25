import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/auth/tokens',

	async code(ctr) {
		// Return Result
		return ctr.print({
			"success": true,
			"tokens": {
				"access": ctr["@"].user.tokens.access,
				"refresh": ctr["@"].user.tokens.refresh
			}
		})
	}
} as ctrFile<Body>