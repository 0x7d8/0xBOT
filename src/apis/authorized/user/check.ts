import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: 'GET',
	path: '/auth/check',

	async code(ctr) {
		// Return Result
		return ctr.print({
			"success": true
		})
	}
} as ctrFile<Body>