import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('showerthought')
		.setDMPermission(false)
		.setDescription('GET A SHOWERTHOUGHT')
		.setDescriptionLocalizations({
			de: 'BEKOMME EINE DUSCH-PHILOSOPHIE'
		}),

	async execute(ctx: CommandInteraction) {
		// Check if Showerthought is Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'showerthought')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» The **\`/showerthought\`** Command is disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Der **\`/showerthought\`** Befehl ist auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] SHOWERTHOUGHT : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferReply()

		// Get Initial Showerthought
		const req = await axios.get(`https://www.reddit.com/r/Showerthoughts/random/.json`)
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
					.setCustomId('showerthought')
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
						.setCustomId('showerthought')
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
			.setTitle('<:IMAGE:1024405297579696179> » SHOWERTHOUGHT')
			.setDescription(`
				» Thought
				\`\`\`${res[0].data.children[0].data.title}\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			const germanThought = (await axios({
				method: 'POST',
				url: 'https://api-free.deepl.com/v2/translate',
				headers: {
					"Authentication": `DeepL-Auth-Key ${ctx.client.config.keys.deepl}`,
					"User-Agent": `0xBOT/${ctx.client.config.version}`,
					"Content-Type": 'application/x-www-form-urlencoded'
				}, data: `auth_key=${ctx.client.config.keys.deepl}&text=${encodeURIComponent(res[0].data.children[0].data.title)}&target_lang=DE`
			})).data
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:IMAGE:1024405297579696179> » DUSCH-PHILOSOPHIE')
				.setDescription(`
					» Gedanke
					\`\`\`${germanThought.translations[0].text}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] SHOWERTHOUGHT : ${upvotes}^`)
		return ctx.interaction.editReply({ embeds: [message], components: [row as any] })
	}
}