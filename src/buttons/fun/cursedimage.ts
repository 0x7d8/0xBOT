import { EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'cursedimage'
	},

	async execute(ctx: ButtonInteraction, type: string) {
		// Check if CursedImage is Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'cursedimage')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» The **\`/cursedimage\`** Command is disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Der **\`/cursedimage\`** Befehl ist auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] CURSEDIMAGE : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferUpdate()

		// Get Initial CursedImages
		const req = await axios.get(`https://www.reddit.com/r/cursedimages/random/.json`)
		const res = req.data

		let upvotes = res[0].data.children[0].data.ups

		// 187 Easter Egg
		if (upvotes === 187) upvotes += ' 🐊'

		// Edit Buttons
		ctx.components.rows[0].components[1].setLabel(String(upvotes))
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:IMAGE:1024405297579696179> » CURSED IMAGE')
			.setDescription(`
				» Title
				\`\`\`${res[0].data.children[0].data.title}\`\`\`
			`).setImage(res[0].data.children[0].data.url)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:IMAGE:1024405297579696179> » VERSTÖRENDES BILD')
				.setDescription(`
					» Titel
					\`\`\`${res[0].data.children[0].data.title}\`\`\`
				`).setImage(res[0].data.children[0].data.url)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[BTN] CURSEDIMAGE : ${upvotes}^`)
		return ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) })
	}
}