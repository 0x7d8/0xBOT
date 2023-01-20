import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDMPermission(false)
		.setDescription('GET A MEME')
		.setDescriptionLocalizations({
			de: 'BEKOMME EIN MEME'
		}),

	async execute(ctx: CommandInteraction) {
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
			ctx.log(false, `[CMD] MEME : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferReply()

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
		if (upvotes === 187) upvotes += ' 🐊'
		if (comments === 187) comments += ' 🐊'

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NEW')
					.setEmoji('1055826473442873385')
					.setCustomId('meme')
					.setStyle(ButtonStyle.Primary),

				new ButtonBuilder()
					.setEmoji('1044959793317691513')
					.setLabel(String(upvotes))
					.setCustomId('BIN-1')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),

				new ButtonBuilder()
					.setEmoji('1054857046916341861')
					.setLabel(String(comments))
					.setCustomId('BIN-2')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('NEU')
						.setEmoji('1055826473442873385')
						.setCustomId('meme')
						.setStyle(ButtonStyle.Primary),

					new ButtonBuilder()
						.setEmoji('1044959793317691513')
						.setLabel(String(upvotes))
						.setCustomId('BIN-1')
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),

					new ButtonBuilder()
						.setEmoji('1054857046916341861')
						.setLabel(String(comments))
						.setCustomId('BIN-2')
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),
				)
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:IMAGE:1024405297579696179> » MEME')
			.setDescription(`
				» Title
				\`\`\`${res[0].data.children[0].data.title}\`\`\`
				» Subreddit
				\`\`\`r/${subreddit}\`\`\`
			`).setImage(res[0].data.children[0].data.url)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:IMAGE:1024405297579696179> » MEME')
				.setDescription(`
					» Titel
					\`\`\`${res[0].data.children[0].data.title}\`\`\`
					» Subreddit
					\`\`\`r/${subreddit}\`\`\`
				`).setImage(res[0].data.children[0].data.url)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] MEME : ${subreddit.toUpperCase()} : ${upvotes}^ : ${comments}`)
		return ctx.interaction.editReply({ embeds: [message], components: [row as any] })
	}
}