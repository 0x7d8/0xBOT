import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('cursedimage')
		.setDMPermission(false)
		.setDescription('GET A CURSED IMAGE')
		.setDescriptionLocalizations({
			de: 'BEKOMME EIN VERSTÖRENDES BILD'
		}),

	async execute(ctx: CommandInteraction) {
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
			ctx.log(false, `[CMD] CURSEDIMAGE : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferReply()

		// Get Initial CursedImage
		const req = await axios.get(`https://www.reddit.com/r/cursedimages/random/.json`)
		const res = req.data

		let upvotes = res[0].data.children[0].data.ups

		// 187 Easter Egg
		if (upvotes === 187) upvotes += ' 🐊'

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NEW')
					.setEmoji('1055826473442873385')
					.setCustomId('cursedimage')
					.setStyle(ButtonStyle.Primary),

				new ButtonBuilder()
					.setEmoji('1044959793317691513')
					.setLabel(String(upvotes))
					.setCustomId('BIN-1')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('NEU')
						.setEmoji('1055826473442873385')
						.setCustomId('cursedimage')
						.setStyle(ButtonStyle.Primary),

					new ButtonBuilder()
						.setEmoji('1044959793317691513')
						.setLabel(String(upvotes))
						.setCustomId('BIN-1')
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),
				)
		}

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
		ctx.log(false, `[CMD] CURSEDIMAGE : ${upvotes}^`)
		return ctx.interaction.editReply({ embeds: [message], components: [row as any] })
	}
}