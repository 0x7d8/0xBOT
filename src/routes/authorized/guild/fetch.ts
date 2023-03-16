import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

export = {
	method: 'GET',
	path: '/fetch/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.status(422).print({ success: false, message: 'NO ID' })

		let cont = true

		// Fetch Guild
		let guild = await ctr['@'].client.guilds.fetch(ctr.queries.get('id')).catch(() => {
			cont = false
			return ctr.print({ success: false, message: 'INVALID GUILD' })
		}); (guild as any).success = true

		// Return Result
		if (cont) return ctr.print(guild)
	}
} as HTTPRouteFile<Body>