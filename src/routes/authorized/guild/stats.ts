import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

export = {
	method: 'GET',
	path: '/stats/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.status(422).print({ success: false, message: 'NO ID' })

		// Return Result
		return ctr.print({
			success: true,
			commands: await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'cmd'),
			buttons: await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'btn'),
			modals: await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'mod')
		})
	}
} as HTTPRouteFile<Body>