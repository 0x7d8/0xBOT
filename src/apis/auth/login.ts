import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

import * as utils from "rjutils-collection"
import { default as DiscordOauth2 } from "discord-oauth2"
const oAuth = new DiscordOauth2()

module.exports = {
	type: webserver.types.post,
	path: '/auth/login',

	async code(ctr: webserverInterface) {
		// Check for Headers
		if (!ctr.header.has('code')) return ctr.print({ "success": false, "message": 'NO CODE' })

		// Get Token
		const token = await oAuth.tokenRequest({
			clientId: ctr.config.client.id,
			clientSecret: ctr.config.client.secret,
			grantType: 'authorization_code',
			scope: ['identify', 'guilds', 'email'],
			redirectUri: 'https://0xbot.de/auth/discord',
			code: ctr.header.get('code')
		}).catch((e) => { })
		if (!token) return ctr.print({ "success": false, "message": 'INVALID TOKEN' })

		// Get Infos
		const userInfos = await oAuth.getUser(token.access_token)

		// Generate Auth Token
		const base = `${userInfos.id} ${token.access_token}`
		const authToken = utils.hashString({ text: base, algorithm: 'sha256', digest: 'hex' })

		// Add To Database
		ctr.api.users.set({
			auth: authToken,
			user: {
				id: userInfos.id,
				name: userInfos.username,
				tag: userInfos.discriminator,
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
			"authToken": authToken,
			"infos": userInfos
		})
	}
}