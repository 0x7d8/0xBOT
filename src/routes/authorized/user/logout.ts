import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

import { default as DiscordOauth2 } from "discord-oauth2"
const oAuth = new DiscordOauth2()

export = {
	method: 'POST',
	path: '/auth/logout',

	async code(ctr) {
		// Remove From Database
		ctr['@'].api.users.rem(ctr["@"].user.id)

		// Remove from Discord
		await oAuth.revokeToken(
			ctr["@"].user.tokens.access,
			Buffer.from(`${ctr['@'].config.client.id}:${ctr['@'].config.client.secret}`).toString("base64")
		)

		// Return Result
		return ctr.print({
			success: true
		})
	}
} as HTTPRouteFile<Body>