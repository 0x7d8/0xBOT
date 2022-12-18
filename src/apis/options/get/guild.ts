import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

module.exports = {
	type: webserver.types.get,
	path: '/options/guild',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('id')) return ctr.print({ "success": false, "message": 'NO ID' })
		if (!ctr.query.has('page')) return ctr.print({ "success": false, "message": 'NO PAGE' })

		// Check Permissions
		if (!await ctr.api.checkSession(
			ctr.header.get('accesstoken'),
			ctr.header.get('tokentype'),
			ctr.header.get('userid'),
			ctr.query.get('id')
		)) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })
		let response: any = { "success": false, "message": "NOT FOUND" }

		// GENERAL
		if (ctr.query.get('page') === 'GENERAL') {
			let guildlang = 'ENGLISH'
			if (await ctr.bot.language.get(ctr.query.get('id')) === 'de') {
				guildlang = 'GERMAN'
			}
			response = {
				"success": true,
				"language": guildlang
			}
		}

		// ECONOMY
		if (ctr.query.get('page') === 'ECONOMY') {
			response = {
				"success": true,
				"businesses": await ctr.bot.settings.get(ctr.query.get('id'), 'businesses'),
				"items": await ctr.bot.settings.get(ctr.query.get('id'), 'items'),
				"cars": await ctr.bot.settings.get(ctr.query.get('id'), 'cars'),
				"stocks": await ctr.bot.settings.get(ctr.query.get('id'), 'stocks'),
				"luckgames": await ctr.bot.settings.get(ctr.query.get('id'), 'luckgames'),
				"daily": await ctr.bot.settings.get(ctr.query.get('id'), 'daily'),
				"work": await ctr.bot.settings.get(ctr.query.get('id'), 'work'),
				"rob": await ctr.bot.settings.get(ctr.query.get('id'), 'rob')
			}
		}

		// FUN
		if (ctr.query.get('page') === 'FUN') {
			response = {
				"success": true,
				"levels": await ctr.bot.settings.get(ctr.query.get('id'), 'levels'),
				"quotes": await ctr.bot.settings.get(ctr.query.get('id'), 'quotes'),
				"meme": await ctr.bot.settings.get(ctr.query.get('id'), 'meme')
			}
		}

		// Return Result
		return ctr.print(response)
	}
}