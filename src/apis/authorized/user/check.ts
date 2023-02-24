import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/auth/check',

	async code(ctr) {
		// Return Result
		return ctr.print({
			"success": true
		})
	}
} as ctrFile<Body>