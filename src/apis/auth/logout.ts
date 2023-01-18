import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

import { default as DiscordOauth2 } from "discord-oauth2"
const oAuth = new DiscordOauth2()

export = {
	method: webserver.types.post,
	path: '/auth/logout',

	async code(ctr) {
		// Check for Headers
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })

		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))
		if (userInfos === 'N-FOUND') return ctr.print({ "success": false, "message": 'USER NOT FOUND' })

		// Remove From Database
		ctr['@'].api.users.rem(userInfos.id)

		// Remove from Discord
		await oAuth.revokeToken(
			userInfos.tokens.access,
			Buffer.from(`${ctr['@'].config.client.id}:${ctr['@'].config.client.secret}`).toString("base64")
		)

		// Return Result
		return ctr.print({
			"success": true
		})
	}
} as ctrFile<Body>