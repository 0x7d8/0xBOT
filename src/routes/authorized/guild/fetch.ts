import { HTTPRouteFile } from "@/interfaces/Webserver"
import { Guild } from "discord.js"

interface Body {}

export = {
	method: 'GET',
	path: '/fetch/guild',

	async code(ctr) {
		// Check for Queries
		if (!ctr.queries.has('id')) return ctr.status(422).print({ success: false, message: 'NO ID' })

		// Fetch Guild
		let guild: Guild
		try {
			guild = await ctr['@'].client.guilds.fetch(ctr.queries.get('id'))
		} catch { return ctr.print({ success: false, message: 'INVALID GUILD' }) }

		// Return Result
		return ctr.print({
			success: true,
			...guild.toJSON() as any
		})
	}
} as HTTPRouteFile<Body>