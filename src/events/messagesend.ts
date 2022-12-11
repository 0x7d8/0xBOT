import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { Events, Message } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
export default {
	name: 'MESSAGE SEND',
	event: Events.MessageCreate,
	once: false,

	async execute(message: Message, client: Client) {
		if (!message.guildId) return

		// Level System
		if (!message.author.bot && Number(message.guildId) > 1000 && (await bot.settings.get(message.guildId, 'level'))) {
			// Calculate old Level
			const oldCache = await bot.stat.get('u-' + message.author.id + '-' + message.guildId + '-C', 'msg')

			const oldXP = Math.round(oldCache / 5)
			let oldLevel = 0, oldLevelXP = oldXP
			while (oldLevelXP >= 500) {
				oldLevel++; oldLevelXP -= 500
			}

			// Level Stats
			await bot.stat.add('u-' + message.author.id + '-TOTAL-A', 'msg', 1)
			await bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-A', 'msg', 1)
			await bot.stat.add('u-' + message.author.id + '-TOTAL-C', 'msg', ((message.content.length > 1000) ? 100 : message.content.length))
			await bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-C', 'msg', ((message.content.length > 1000) ? 100 : message.content.length))

			// Calculate New Level
			const newCache = await bot.stat.get('u-' + message.author.id + '-' + message.guildId + '-C', 'msg')

			const newXP = Math.round(newCache / 5)
			let newLevel = 0, newLevelXP = newXP
			while (newLevelXP >= 500) {
				newLevel++; newLevelXP -= 500
			}

			// Send LevelUp Message if needed
			if (oldLevel < newLevel) {
				// Get Guild Language
				let guildlang = 'en'
				const glang = await bot.language.get(message.guildId)
				if (Number(glang) === 1) guildlang = 'de'

				// Create Button
				const row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setEmoji('1030476921777180672')
							.setCustomId('rem-levelmsg')
							.setStyle(ButtonStyle.Danger),
					)

				// Create Embed
				let content = `» Good Writing <@${message.author.id}>! You are now Level **${newLevel}**.\nTo view your level do </level:1030147810194100245>`
				if (guildlang === 'de') content = `» Gutes schreiben <@${message.author.id}>! Du bist nun Level **${newLevel}**.\nZum anschauen deines Levels mach </level:1030147810194100245>`

				// Send Message
				return message.channel.send({ content: content, components: [row as any] })
			}
		}
	}
}