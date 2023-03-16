import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

export = {
	method: 'GET',
	path: '/auth/check',

	async code(ctr) {
		// Return Result
		return ctr.print({
			success: true
		})
	}
} as HTTPRouteFile<Body>