import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/options/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })

		// Check Permissions
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })
		if (!await ctr['@'].api.checkAuth(ctr.headers.get('authtoken'), ctr.queries.get('id'))) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Return Result
		let guildlang = 'ENGLISH'
		if (await ctr['@'].bot.language.get(ctr.queries.get('id')) === 'de') guildlang = 'GERMAN'
		return ctr.print({
			"success": true,
			"language": guildlang,

			"businesses": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'businesses'),
			"items": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'items'),
			"cars": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'cars'),
			"stocks": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'stocks'),
			"luckgames": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'luckgames'),
			"daily": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'daily'),
			"work": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'work'),
			"rob": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'rob'),

			"levels": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'levels'),
			"quotes": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'quotes'),
			"showerthought": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'showerthought'),
			"cursedimage": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'cursedimage'),
			"meme": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'meme')
		})
	}
} as ctrFile<Body>