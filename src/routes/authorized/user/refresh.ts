import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {}

import { default as DiscordOauth2 } from "discord-oauth2"
const oAuth = new DiscordOauth2()

export = {
	method: 'GET',
	path: '/auth/refresh',

	async code(ctr) {
		// Refresh Token
		const token = await oAuth.tokenRequest({
			clientId: ctr['@'].config.client.id,
			clientSecret: ctr['@'].config.client.secret,
			grantType: 'refresh_token',
			scope: ['identify', 'guilds', 'email'],
			redirectUri: 'https://0xbot.de/auth/discord',
			refreshToken: ctr["@"].user.tokens.refresh
		})

		// Update The Database
		ctr['@'].api.users.set({
			auth: ctr.headers.get('authtoken'),
			user: {
				id: ctr["@"].user.id,
				name: ctr["@"].user.name,
				tag: ctr["@"].user.tag,
				email: ctr["@"].user.email,
				avatar: ctr["@"].user.avatar
			}, tokens: {
				access: token.access_token,
				refresh: token.refresh_token
			}
		})

		// Return Result
		return ctr.print({
			success: true,
			tokens: {
				access: token.access_token,
				refresh: token.refresh_token
			}
		})
	}
} as HTTPRouteFile<Body>