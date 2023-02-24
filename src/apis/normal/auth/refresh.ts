import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

import { default as DiscordOauth2 } from "discord-oauth2"
const oAuth = new DiscordOauth2()

export = {
	method: webserver.types.get,
	path: '/auth/refresh',

	async code(ctr) {
		// Check for Headers
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })

		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))
		if (!userInfos.id) return ctr.print({ "success": false, "message": 'USER NOT FOUND' })

		// Refresh Token
		const token = await oAuth.tokenRequest({
			clientId: ctr['@'].config.client.id,
			clientSecret: ctr['@'].config.client.secret,
			grantType: 'refresh_token',
			scope: ['identify', 'guilds', 'email'],
			redirectUri: 'https://0xbot.de/auth/discord',
			refreshToken: userInfos.tokens.refresh
		})

		// Update The Database
		ctr['@'].api.users.set({
			auth: ctr.headers.get('authtoken'),
			user: {
				id: userInfos.id,
				name: userInfos.name,
				tag: userInfos.tag,
				email: userInfos.email,
				avatar: userInfos.avatar
			}, tokens: {
				access: token.access_token,
				refresh: token.refresh_token
			}
		})

		// Return Result
		return ctr.print({
			"success": true,
			"tokens": {
				"access": token.access_token,
				"refresh": token.refresh_token
			}
		})
	}
} as ctrFile<Body>