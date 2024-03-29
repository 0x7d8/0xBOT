import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

export = {
	method: 'GET',
	path: '/check/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.status(422).print({ success: false, message: 'NO ID' })

		// Get Stats
		let status = true
		await ctr['@'].client.guilds.fetch(ctr.queries.get('id')).catch(() => { status = false })

		// Return Result
		return ctr.print({
			success: status
		})
	}
} as HTTPRouteFile<Body>