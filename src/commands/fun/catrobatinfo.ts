import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('catrobatinfo')
		.setDMPermission(false)
		.setDescription('GET INFO ABOUT A CATROBAT PROJECT')
		.setDescriptionLocalizations({
			de: 'BEKOMME INFO ÜBER EIN CATROBAT PROJEKT'
		})
		.addStringOption((option: any) =>
			option.setName('id')
				.setDescription('THE ID')
				.setDescriptionLocalizations({
					de: 'DIE ID'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Defer Reply
		await ctx.interaction.deferReply()

		// Set Variables
		const id = ctx.getOption('id') as string
		const req = await axios({
			method: 'GET',
			url: `https://share.catrob.at/api/project/${id}`,
			validateStatus: false as any,
			headers: {}
		}); const info = req.data

		// Check for Server Error
		if (req.status !== 200 && req.status !== 404) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
				.setDescription(`» Couldnt reach the Catrobat Servers! (Status ${req.status})`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
					.setDescription(`» Konnte die Catrobat Server nicht erreichen! (Status ${req.status})`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()} : SERVERSDOWN`)
			return ctx.interaction.editReply({ embeds: [message] })
		}

		// Check if Project exists
		if (req.status === 404) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
				.setDescription(`» The Project **${id}** was not found!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
					.setDescription(`» Das Projekt **${id}** wurde nicht gefunden!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()} : NOTEXIST`)
			return ctx.interaction.editReply({ embeds: [message] })
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
			.setThumbnail(info.screenshot_small)
  		.setDescription(`
				[${info.name}](https://share.catrob.at/app/project/${id})

				» Description
				\`\`\`${info.description.replace('```', '``')}\`\`\`
				» Size
				\`\`\`${Number(info.filesize).toFixed(2)}MB\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CUBE:1024404832452350032> » CATOBAT PROJEKT INFO')
				.setThumbnail(info.screenshot_small)
				.setDescription(`
					[${info.name}](https://share.catrob.at/app/project/${id})

					» Beschreibung
					\`\`\`${info.description.replace('```', '``')}\`\`\`
					» Größe
					\`\`\`${Number(info.filesize).toFixed(2)}MB\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()}`)
		return ctx.interaction.editReply({ embeds: [message] })
	}
}