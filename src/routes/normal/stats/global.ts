import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

export = {
	method: 'GET',
	path: '/stats/global',

	async code(ctr) {
		// Return Result
		return ctr.print({
			success: true,
			commands: Number(await ctr['@'].bot.stat.get(`t-all`, 'cmd')),
			buttons: Number(await ctr['@'].bot.stat.get(`t-all`, 'btn')),
			modals: Number(await ctr['@'].bot.stat.get(`t-all`, 'mod'))
		})
	}
} as HTTPRouteFile<Body>