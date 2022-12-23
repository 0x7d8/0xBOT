import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'meme'
	},

	async execute(ctx: ButtonInteraction, type: string) {
		const axios = (await import('axios')).default

		// Check if Meme is Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'meme')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» The **\`/meme\`** Command is disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Der **\`/meme\`** Befehl ist auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] MEME : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferUpdate()

		// Set Variables
		const random = ctx.bot.random(1, 5)

		// Set Subreddit
		let subreddit: string
		if (random === 1) subreddit = 'memes'
		if (random === 2) subreddit = 'me_irl'
		if (random === 3) subreddit = 'CrappyDesign'
		if (random === 4) subreddit = 'dankmemes'
		if (random === 5) subreddit = 'terriblefacebookmemes'

		// Get Initial Meme
		const req = await axios.get(`https://www.reddit.com/r/${subreddit}/random/.json`)
		const res = req.data

		let upvotes = res[0].data.children[0].data.ups
		let comments = res[0].data.children[0].data.num_comments

		// 187 Easter Egg
		if (upvotes === 187) upvotes = upvotes + ' 🐊'
		if (comments === 187) comments = comments + ' 🐊'

		// Edit Buttons
		ctx.components.rows[0].components[1].setLabel(String(upvotes))
		ctx.components.rows[0].components[2].setLabel(String(comments))
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle(`<:IMAGE:1024405297579696179> » ${res[0].data.children[0].data.title.toUpperCase()}`)
			.setDescription(`
				» SUBREDDIT:
				\`r/${subreddit}\`
			`).setImage(res[0].data.children[0].data.url)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle(`<:IMAGE:1024405297579696179> » ${res[0].data.children[0].data.title.toUpperCase()}`)
				.setDescription(`
					» SUBREDDIT:
					\`r/${subreddit}\`
				`).setImage(res[0].data.children[0].data.url)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[BTN] MEME : ${subreddit.toUpperCase()} : ${upvotes}^ : ${comments}`)
		return ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) })
	}
}